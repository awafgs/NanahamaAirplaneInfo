let airports = [];      // [{id, name}]
let flatEdges = [];      // [{from, to, airline, type, color, freq, aircraft, note}]
let globalPaths = [];    // [{nodes:[id,...], edges:[edge,...]}]
let activeRouteIdx = 0;
let routeFilter = 'all'; // 'all' | 'international' | 'domestic'

function setRouteFilter(val) {
    routeFilter = val;
}

// 便（route）の国際線/国内線は from/to それぞれの空港の country から自動判定する。
// どちらかの空港が国外空港（foreign）なら国際線、両方とも国内空港（domestic）なら国内線。
function routeType(from, to) {
    return (airportCountry(from) === "foreign" || airportCountry(to) === "foreign") ? "international" : "domestic";
}

window.onload = function() {
    initData();
    populateCompanySelect('start');
    populateCompanySelect('goal');
};

function initData() {
    airports = Object.keys(airportData).map(id => ({ id, name: airportName(id) }));

    flatEdges = [];
    for (let airline in airlineData) {
        let info = airlineData[airline];
        info.routes.forEach(r => {
            flatEdges.push({
                from: r.from, to: r.to, airline: airline, type: routeType(r.from, r.to),
                color: info.color, textDark: info.textDark,
                freq: r.freq, aircraft: r.aircraft, note: r.note
            });
        });
    }
}

// 特定の航空会社の就航空港を「国内空港」「国外空港」に分類する（airportData の country で判定）
// 並び順は airportData の order（コード側で自由に並べ替え可能）に従う
function groupedAirportsForAirline(airline) {
    let cat = { domestic: new Map(), foreign: new Map() };
    (airlineData[airline].routes || []).forEach(r => {
        [r.from, r.to].forEach(id => {
            if (!airportData[id]) return;
            cat[airportCountry(id)].set(id, airportName(id));
        });
    });
    let toList = m => [...m.entries()]
        .sort((a, b) => airportOrder(a[0]) - airportOrder(b[0]))
        .map(([id, name]) => ({ id, name }));
    return { domestic: toList(cat.domestic), foreign: toList(cat.foreign) };
}

function populateCompanySelect(pos) {
    let compSelect = document.getElementById(`${pos}Comp`);
    compSelect.innerHTML = "";
    for (let airline in airlineData) {
        let opt = document.createElement("option");
        opt.value = airline; opt.textContent = airline;
        compSelect.appendChild(opt);
    }
    updateAirports(pos);
}

function updateAirports(pos) {
    let airline = document.getElementById(`${pos}Comp`).value;
    let stSelect = document.getElementById(`${pos}St`);
    stSelect.innerHTML = "";

    let grouped = groupedAirportsForAirline(airline);
    let addGroup = (label, list) => {
        if (!list.length) return;
        let og = document.createElement("optgroup");
        og.label = label;
        list.forEach(ap => {
            let opt = document.createElement("option");
            opt.value = ap.id; opt.textContent = `${ap.id} : ${ap.name}`;
            og.appendChild(opt);
        });
        stSelect.appendChild(og);
    };
    addGroup("国内空港", grouped.domestic);
    addGroup("国外空港", grouped.foreign);

    onSelectInput(pos);
}

let suggestState = { start: { items: [], hi: -1 }, goal: { items: [], hi: -1 } };

function onTextInput(pos) {
    let val = document.getElementById(`${pos}Input`).value.trim();
    let listEl = document.getElementById(`${pos}Suggest`);
    let state = suggestState[pos];

    if (!val) { listEl.style.display = "none"; listEl.innerHTML = ""; state.items = []; state.hi = -1; return; }

    let lower = val.toLowerCase();
    let matches = airports.filter(a => a.name.includes(val) || a.id.toLowerCase().includes(lower));

    // 拠点空港 → 国内空港 → 国外空港 の順に並べ、同グループ内は airportData の order 順
    let rank = a => {
        if (a.id === primaryAirportId) return 0;
        return airportCountry(a.id) === "foreign" ? 2 : 1;
    };
    matches.sort((a, b) => rank(a) - rank(b) || airportOrder(a.id) - airportOrder(b.id));
    matches = matches.slice(0, 15);

    state.items = matches; state.hi = -1;
    renderSuggestions(pos);
}

function renderSuggestions(pos) {
    let listEl = document.getElementById(`${pos}Suggest`);
    let state = suggestState[pos];
    if (!state.items.length) {
        listEl.innerHTML = `<div class="suggest-empty">該当する空港が見つかりません</div>`;
        listEl.style.display = "block";
        return;
    }
    listEl.innerHTML = state.items.map((a, i) => {
        let isHub = a.id === primaryAirportId;
        let country = airportCountry(a.id);
        let label = isHub ? "拠点" : (country === "foreign" ? "国外" : "国内");
        let badgeColor = isHub ? "#e67e22" : (country === "foreign" ? "#4a86e8" : "#50a050");
        return `
        <div class="suggest-item ${i === state.hi ? 'hi' : ''}" data-idx="${i}"
             onmousedown="selectSuggestion('${pos}', ${i})">
            <span class="suggest-badge" style="background:${badgeColor};color:white;">${a.id}</span>
            <span class="suggest-name">${a.name}</span>
            <span class="suggest-sub">${label}</span>
        </div>`;
    }).join("");
    listEl.style.display = "block";
}

function selectSuggestion(pos, idx) {
    let state = suggestState[pos];
    let match = state.items[idx];
    if (!match) return;

    // その空港に就航している航空会社を探して会社セレクトに反映
    let airline = Object.keys(airlineData).find(al =>
        airlineData[al].routes.some(r => r.from === match.id || r.to === match.id)
    );
    if (airline) {
        document.getElementById(`${pos}Comp`).value = airline;
        updateAirports(pos);
    }
    document.getElementById(`${pos}St`).value = match.id;
    document.getElementById(`${pos}Input`).value = match.name;

    let listEl = document.getElementById(`${pos}Suggest`);
    listEl.style.display = "none"; listEl.innerHTML = "";
    state.items = []; state.hi = -1;
}

function onSuggestKeydown(evt, pos) {
    let state = suggestState[pos];
    if (!state.items.length) return;
    if (evt.key === "ArrowDown") {
        evt.preventDefault();
        state.hi = (state.hi + 1) % state.items.length;
        renderSuggestions(pos);
    } else if (evt.key === "ArrowUp") {
        evt.preventDefault();
        state.hi = (state.hi - 1 + state.items.length) % state.items.length;
        renderSuggestions(pos);
    } else if (evt.key === "Enter") {
        evt.preventDefault();
        selectSuggestion(pos, state.hi >= 0 ? state.hi : 0);
    } else if (evt.key === "Escape") {
        document.getElementById(`${pos}Suggest`).style.display = "none";
    }
}

document.addEventListener("click", (evt) => {
    ["start", "goal"].forEach(pos => {
        let wrap = document.getElementById(`${pos}Input`).closest(".input-row");
        if (wrap && !wrap.contains(evt.target)) {
            document.getElementById(`${pos}Suggest`).style.display = "none";
        }
    });
});

function onSelectInput(pos) {
    let stSelect = document.getElementById(`${pos}St`);
    let id = stSelect.value;
    document.getElementById(`${pos}Input`).value = id ? airportName(id) : "";
    document.getElementById(`${pos}Suggest`).style.display = "none";
}

function searchRoute() {
    initData();

    globalPaths = [];
    document.getElementById("tabs").innerHTML = "";
    document.getElementById("result").innerHTML = "";

    let startId = document.getElementById("startSt").value;
    let goalId = document.getElementById("goalSt").value;
    if (!startId || !goalId || startId === goalId) return alert("出発空港と到着空港を別々に選択してください");

    // 空港コードをノードとしたグラフを構築（同じ空港コードは自動的に同一ノード＝乗継地点になる）
    let graph = {};
    airports.forEach(a => graph[a.id] = []);
    flatEdges.forEach(e => {
        if (routeFilter !== 'all' && e.type !== routeFilter) return;
        if (!graph[e.from]) graph[e.from] = [];
        if (!graph[e.to]) graph[e.to] = [];
        graph[e.from].push({ to: e.to, edge: e });
        graph[e.to].push({ to: e.from, edge: e });
    });

    let queue = [{ nodes: [startId], edges: [] }];
    let minCost = { [startId]: 1 };

    while (queue.length > 0 && globalPaths.length < 3) {
        let node = queue.shift();
        let currId = node.nodes[node.nodes.length - 1];

        if (currId === goalId) {
            let key = node.nodes.join('-');
            if (!globalPaths.some(p => p.nodes.join('-') === key)) {
                globalPaths.push(node);
            }
            continue;
        }

        (graph[currId] || []).forEach(link => {
            let nextId = link.to;
            let nextCost = node.nodes.length + 1;

            if (minCost[nextId] !== undefined && minCost[nextId] <= nextCost) return;
            if (node.nodes.includes(nextId)) return;

            minCost[nextId] = nextCost;
            queue.push({ nodes: [...node.nodes, nextId], edges: [...node.edges, link.edge] });
        });
    }
    renderTabs();
}

function renderTabs() {
    let tabs = document.getElementById("tabs");
    let container = document.getElementById("result");
    tabs.innerHTML = "";
    if (!globalPaths.length) { container.innerHTML = "❌ 経路が見つかりません。"; container.style.display = "block"; tabs.style.display = "none"; return; }

    globalPaths.forEach((path, idx) => {
        let tab = document.createElement("div");
        tab.className = `tab ${idx === 0 ? 'active' : ''}`;
        tab.textContent = `経路 ${idx + 1}（乗継${path.edges.length - 1}回）`;
        tab.onclick = () => {
            document.querySelectorAll(".tab").forEach((t, i) => t.classList.toggle("active", i === idx));
            activeRouteIdx = idx; renderActiveRoute();
        };
        tabs.appendChild(tab);
    });
    tabs.style.display = "flex"; activeRouteIdx = 0;
    renderActiveRoute();
}

function renderActiveRoute() {
    let container = document.getElementById("result");
    let path = globalPaths[activeRouteIdx];
    let html = "";

    path.edges.forEach((edge, idx) => {
        if (idx > 0) {
            let hubId = path.nodes[idx];
            html += `<div class="transfer-row">🔄 乗り継ぎ（${hubId} : ${airportName(hubId)}）</div>`;
        }

        let depId = path.nodes[idx];
        let arrId = path.nodes[idx + 1];
        let depName = airportName(depId);
        let arrName = airportName(arrId);
        let textCol = edge.textDark ? "#333" : "white";
        let typeLabel = edge.type === "international" ? "国際線" : "国内線";
        let typeClass = edge.type === "international" ? "badge-intl" : "badge-dom";

        html += `
            <div class="line-block">
                <div class="line-header" style="background:${edge.color};color:${textCol};">
                    <span><span class="type-badge ${typeClass}">${typeLabel}</span>${edge.airline}</span>
                    <span class="flight-meta">${edge.aircraft}</span>
                </div>
                <div class="station-container" style="--line-color:${edge.color}">
                    <div class="st-row"><div class="st-badge">${depId}</div><div class="st-name">${depName}</div></div>
                    <div class="st-row"><div class="st-badge">${arrId}</div><div class="st-name">${arrName}</div></div>
                </div>
                <div class="flight-info">運航頻度：${edge.freq}${edge.note ? `<br>${edge.note}` : ""}</div>
            </div>
        `;
    });

    container.innerHTML = html; container.style.display = "block";
}
