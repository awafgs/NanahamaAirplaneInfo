// ==========================================================
// 空港マスタ
// ----------------------------------------------------------
// name    : 空港名
// country : "domestic"（国内空港）または "foreign"（国外空港）
// order   : 一覧・候補表示の並び順（数値が小さいほど上に表示）
//           ここを書き換えるだけで表示順を自由に並べ替えられます
// ==========================================================
const airportData = {
    // ---- 国内空港 ----
    "HIH": { name: "日原空港",     country: "domestic", order: 1 },
    "KMN": { name: "霞野空港",     country: "domestic", order: 2 },
    "KSI": { name: "松津空港",     country: "domestic", order: 3 },
    "KRH": { name: "霧原空港",     country: "domestic", order: 4 },
    "AKO": { name: "秋霜国際空港", country: "domestic", order: 5 },
    "NHM": { name: "七浜国際空港", country: "domestic", order: 6 },
    "HMK": { name: "姫園国際空港", country: "domestic", order: 7 },
    "RCI": { name: "大安飛行場", country: "domestic", order: 8 },
    "RCX": { name: "岩城空港（三陽飛行場）", country: "domestic", order: 9 },
    "YOB": { name: "四ツ橋空港", country: "domestic", order: 10 },
    "ISR": { name: "漁火空港", country: "domestic", order: 11 },
    "NKK": { name: "西小箱国際空港", country: "domestic", order: 12 },
    "MZU": { name: "御那洲空港", country: "domestic", order: 13 },
    "OUS": { name: "扇浦空港", country: "domestic", order: 14 },
    "KIC": { name: "県営吉呉空港", country: "domestic", order: 15 },

    // ---- 国外空港 ----
    "NRT": { name: "成田空港（日本）",                         country: "foreign", order: 10 },
    "HND": { name: "羽田空港（日本）",                         country: "foreign", order: 11 },
    "NGO": { name: "中部国際空港（日本）",                     country: "foreign", order: 12 },
    "KIX": { name: "関西国際空港（日本）",                     country: "foreign", order: 13 },
    "UKB": { name: "神戸空港（日本）",                         country: "foreign", order: 14 },
    "ICN": { name: "仁川国際空港（韓国）",                     country: "foreign", order: 20 },
    "TPE": { name: "桃園国際空港（台湾）",                     country: "foreign", order: 21 },
    "KHH": { name: "高雄国際空港（台湾）",                     country: "foreign", order: 22 },
    "HNL": { name: "ダニエル・K・イノウエ国際空港（ハワイ）", country: "foreign", order: 23 },
    "IAD": { name: "ワシントン・ダレス国際空港（アメリカ）",   country: "foreign", order: 24 },
    "JFK": { name: "ジョン・F・ケネディ国際空港（アメリカ）",  country: "foreign", order: 25 },
    "SYD": { name: "シドニー国際空港（オーストラリア）",       country: "foreign", order: 26 },
    "LGW": { name: "ロンドン・ガトウィック空港（英国）",       country: "foreign", order: 27 },
    "GMP": { name: "ソウル・金浦国際空港（韓国）",           country: "foreign", order: 28 },
    "PEK": { name: "北京首都国際空港（中国）",               country: "foreign", order: 29 },
    "SHA": { name: "上海虹橋国際空港（中国）",               country: "foreign", order: 30 },
    "CAN": { name: "広州白雲国際空港（中国）",               country: "foreign", order: 31 },
    "HKG": { name: "香港国際空港（香港）",                   country: "foreign", order: 32 },
    "TSA": { name: "台北松山空港（台湾）",                   country: "foreign", order: 33 },
    "BKK": { name: "スワンナプーム国際空港（タイ）",         country: "foreign", order: 34 },
    "SIN": { name: "シンガポール・チャンギ国際空港（シンガポール）", country: "foreign", order: 35 },
    "HAN": { name: "ノイバイ国際空港（ベトナム）",           country: "foreign", order: 36 },
    "MNL": { name: "ニノイ・アキノ国際空港（フィリピン）",   country: "foreign", order: 37 },
    "DEL": { name: "インディラ・ガンディー国際空港（インド）", country: "foreign", order: 38 },
    "LHR": { name: "ロンドン・ヒースロー空港（英国）",       country: "foreign", order: 39 },
    "CDG": { name: "パリ＝シャルル・ド・ゴール空港（フランス）", country: "foreign", order: 40 },
    "FRA": { name: "フランクフルト空港（ドイツ）",           country: "foreign", order: 41 },
    "FCO": { name: "ローマ・フィウミチーノ空港（イタリア）", country: "foreign", order: 42 },
    "HEL": { name: "ヘルシンキ空港（フィンランド）",         country: "foreign", order: 43 },
    "ARN": { name: "ストックホルム・アーランダ空港（スウェーデン）", country: "foreign", order: 44 },
    "AMS": { name: "アムステルダム・スキポール空港（オランダ）", country: "foreign", order: 45 },
    "MXP": { name: "ミラノ・マルペンサ空港（イタリア）",     country: "foreign", order: 46 },
    "SFO": { name: "サンフランシスコ国際空港（アメリカ）",   country: "foreign", order: 47 },
    "LAX": { name: "ロサンゼルス国際空港（アメリカ）",       country: "foreign", order: 48 },
    "SEA": { name: "シアトル・タコマ国際空港（アメリカ）",   country: "foreign", order: 49 },
    "ORD": { name: "シカゴ・オヘア国際空港（アメリカ）",     country: "foreign", order: 50 },
    "DFW": { name: "ダラス・フォートワース国際空港（アメリカ）", country: "foreign", order: 51 },
    "YVR": { name: "バンクーバー国際空港（カナダ）",         country: "foreign", order: 52 },
    "YYZ": { name: "トロント・ピアソン国際空港（カナダ）",   country: "foreign", order: 53 },
    "AKL": { name: "オークランド国際空港（ニュージーランド）", country: "foreign", order: 54 },
    "KKS": { name: "海洲国際空港（海洲国）", country: "foreign", order: 55 },
};

// 検索候補で「拠点」バッジを付ける空港（自社ホーム空港）
const primaryAirportId = "NHM";

// ---- 空港データアクセス用ヘルパー ----
// name/country/order の取り出しは必ずこの関数経由で行う。
// （airportData の中身の持ち方を変えてもここだけ直せばよい）
function airportName(id) {
    return airportData[id] ? airportData[id].name : id;
}
function airportCountry(id) {
    // 不明な空港は安全側で "domestic" 扱い
    return airportData[id] ? airportData[id].country : "domestic";
}
function airportOrder(id) {
    return (airportData[id] && airportData[id].order !== undefined) ? airportData[id].order : 9999;
}

// ==========================================================
// 航空会社データ（会社ごとに就航区間のリストを持つ）
// ----------------------------------------------------------
// 各 route は from/to の空港コードのみを持ちます。
// 「国内線/国際線」の区分は route には持たせず、from/to それぞれの
// 空港の country（上の airportData）から自動的に判定されます。
// ==========================================================
const airlineData = {
    "七浜ハイウィング航空": {
        color: "#1565c0",
        textDark: false,
        routes: [
            // 国外空港への路線
            { from: "HIH", to: "ICN", freq: "週21便（日3便）", aircraft: "ボーイング787-9", note: "" },
            { from: "HIH", to: "TPE", freq: "週21便（日3便）", aircraft: "ボーイング787-9", note: "" },
            { from: "HIH", to: "LGW", freq: "週7便（日1便）", aircraft: "ボーイング787-8", note: "" },
            { from: "HIH", to: "KHH", freq: "週14便（日2便）", aircraft: "エアバスA320neo", note: "" },
            { from: "HIH", to: "HNL", freq: "週7便（日1便）", aircraft: "エアバスA321neo", note: "" },
            { from: "HIH", to: "IAD", freq: "週4便", aircraft: "ボーイング787-9", note: "" },
            { from: "HIH", to: "JFK", freq: "週3便", aircraft: "ボーイング787-9", note: "" },
            { from: "HIH", to: "SYD", freq: "週7便（日1便）", aircraft: "ボーイング787-9", note: "" },
            { from: "HIH", to: "NRT", freq: "週21便（日3便）", aircraft: "ボーイング787-9", note: "" },
            { from: "HIH", to: "HND", freq: "週14便（日2便）", aircraft: "ボーイング787-9", note: "" },
            { from: "HIH", to: "NGO", freq: "週7便（日1便）", aircraft: "エアバスA320neo", note: "" },
            { from: "HIH", to: "KIX", freq: "週14便（日2便）", aircraft: "ボーイング787-9", note: "" },
            { from: "HIH", to: "UKB", freq: "週7便（日1便）", aircraft: "エアバスA320neo", note: "" },
            { from: "KMN", to: "HND", freq: "週7便（日1便）", aircraft: "エアバスA320neo", note: "全便霧原郷里航空・エアセベリッシュとコードシェア" },
            { from: "KMN", to: "KIX", freq: "週7便（日1便）", aircraft: "エアバスA320neo", note: "全便霧原郷里航空・エアセベリッシュとコードシェア" },
            { from: "KMN", to: "ICN", freq: "週7便（日1便）", aircraft: "エアバスA320neo", note: "全便霧原郷里航空・エアセベリッシュとコードシェア" },
            // 国内空港への路線
            { from: "HIH", to: "KSI", freq: "定期便週42便（日6便）", aircraft: "787-8,A321neo", note: "" },
            { from: "HIH", to: "KRH", freq: "定期便週42便（日6便）", aircraft: "787-8", note: "全便霧原郷里航空とコードシェア" },
            { from: "HIH", to: "AKO", freq: "定期便週42便（日6便）", aircraft: "787-8,A321neo", note: "" }
        ]
    },
    "エア・セベリッシュ": {
        color: "#7b1fa2",
        textDark: false,
        routes: [
            // 2026年夏ダイヤ（2026.3.29〜2026.10.24）より、既存の空港マスタに対応する路線を収録。
            // Excelの時刻表は便単位の資料のため、検索画面では路線ごとの週間運航便数に集約しています。
            // 国内線
            { from: "NHM", to: "HIH", freq: "週21便（日3便）", aircraft: "A321/321,B763/763,B738/738", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "KRH", freq: "週119便（日17便）", aircraft: "B788/88D,B789/89D,B78X/781,B739/739,B738/738,A321/321,A320/320", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "KSI", freq: "週56便（日8便）", aircraft: "ボーイング787,ボーイング787-9,エアバスA320,A321", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "AKO", freq: "週119便（日17便）", aircraft: "ボーイング787-8,ボーイング787-9,ボーイング737,エアバスA321", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "RCX", freq: "週56便（日8便）", aircraft: "ボーイング737-9,エアバスA321,ボーイング787-8", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "RCI", freq: "週28便（日4便）", aircraft: "ボーイング737-8", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "OUS", freq: "週56便（日8便）", aircraft: "ボーイング787-8,ボーイング787-9,ボーイング737-9,エアバスA321", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },

            // 国際線
            { from: "NHM", to: "HND", freq: "週28便（日4便）", aircraft: "B788/788,B789/789", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "GMP", freq: "週14便（日2便）", aircraft: "A321/321,B789/789", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "PEK", freq: "週14便（日2便）", aircraft: "B739/739,B788/788", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "SHA", freq: "週14便（日2便）", aircraft: "A321/321,B789/789", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "CAN", freq: "週14便（日2便）", aircraft: "B763/763,B788/788", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "HKG", freq: "週14便（日2便）", aircraft: "A359/359,B77W/773", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "TSA", freq: "週14便（日2便）", aircraft: "A321/321,B789/789", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "BKK", freq: "週14便（日2便）", aircraft: "B77W/773,B789/789", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "SIN", freq: "週7便（日1便）", aircraft: "A359/359", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "HAN", freq: "週7便（日1便）", aircraft: "B789/789", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "MNL", freq: "週7便（日1便）", aircraft: "B788/788", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "DEL", freq: "週7便（日1便）", aircraft: "B789/789", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "LHR", freq: "週7便（日1便）", aircraft: "B77W/773", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "CDG", freq: "週7便（日1便）", aircraft: "B789/789", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "FRA", freq: "週7便（日1便）", aircraft: "B789/78P", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "FCO", freq: "週7便（日1便）", aircraft: "B789/789", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "HEL", freq: "週7便（日1便）", aircraft: "B77W/773", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "ARN", freq: "週7便（日1便）", aircraft: "B77W/773", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "AMS", freq: "週7便（日1便）", aircraft: "B788/78G,B789/78P", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "MXP", freq: "週7便（日1便）", aircraft: "B788/78G", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "SFO", freq: "週7便（日1便）", aircraft: "A359/359", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "LAX", freq: "週7便（日1便）", aircraft: "A359/359", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "SEA", freq: "週7便（日1便）", aircraft: "B788/78G", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "ORD", freq: "週7便（日1便）", aircraft: "A359/359", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "JFK", freq: "週7便（日1便）", aircraft: "B77W/773", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "IAD", freq: "週7便（日1便）", aircraft: "B77W/773", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "DFW", freq: "週7便（日1便）", aircraft: "A359/359", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "YVR", freq: "週7便（日1便）", aircraft: "B788/788", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "YYZ", freq: "週7便（日1便）", aircraft: "B789/789", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "SYD", freq: "週7便（日1便）", aircraft: "A359/359", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "AKL", freq: "週7便（日1便）", aircraft: "B788/78G,B789/789", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "HNL", freq: "週7便（日1便）", aircraft: "A359/359", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
            { from: "NHM", to: "KKS", freq: "週7便（日1便）", aircraft: "A333/333,A339,339", note: "2026年夏ダイヤ（2026.3.29〜2026.10.24）" },
        ]
    }
};
