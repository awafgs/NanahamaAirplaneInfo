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
};

// 検索候補で「拠点」バッジを付ける空港（自社ホーム空港）
const primaryAirportId = "HIH";

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
    }
};
