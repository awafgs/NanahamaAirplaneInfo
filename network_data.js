// 空港マスタ（空港コード: 空港名）
const airportData = {
    "ICN": "仁川国際空港（韓国）",
    "TPE": "桃園国際空港（台湾）",
    "LGW": "ロンドン・ガトウィック空港（英国）",
    "KHH": "高雄国際空港（台湾）",
    "HNL": "ダニエル・K・イノウエ国際空港（ハワイ）",
    "IAD": "ワシントン・ダレス国際空港（アメリカ）",
    "JFK": "ジョン・F・ケネディ国際空港（アメリカ）",
    "SYD": "シドニー国際空港（オーストラリア）",
    "NRT": "成田空港（日本）",
    "HND": "羽田空港（日本）",
    "NGO": "中部国際空港（日本）",
    "KIX": "関西国際空港（日本）",
    "UKB": "神戸空港（日本）",
    "KMN": "霞野空港",
    "KSI": "松津空港",
    "KRH": "霧原空港",
    "AKO": "秋霜国際空港",
    "HIH": "日原空港",
};

// 航空会社データ（会社ごとに就航区間のリストを持つ）
const airlineData = {
    "七浜ハイウィング航空": {
        color: "#1565c0",
        textDark: false,
        routes: [
            // 国際線
            { from: "HIH", to: "ICN", type: "international", freq: "週21便（日3便）", aircraft: "ボーイング787-9", note: "" },
            { from: "HIH", to: "TPE", type: "international", freq: "週21便（日3便）", aircraft: "ボーイング787-9", note: "" },
            { from: "HIH", to: "LGW", type: "international", freq: "週7便（日1便）", aircraft: "ボーイング787-8", note: "" },
            { from: "HIH", to: "KHH", type: "international", freq: "週14便（日2便）", aircraft: "エアバスA320neo", note: "" },
            { from: "HIH", to: "HNL", type: "international", freq: "週7便（日1便）", aircraft: "エアバスA321neo", note: "" },
            { from: "HIH", to: "IAD", type: "international", freq: "週4便", aircraft: "ボーイング787-9", note: "" },
            { from: "HIH", to: "JFK", type: "international", freq: "週3便", aircraft: "ボーイング787-9", note: "" },
            { from: "HIH", to: "SYD", type: "international", freq: "週7便（日1便）", aircraft: "ボーイング787-9", note: "" },
            { from: "HIH", to: "NRT", type: "international", freq: "週21便（日3便）", aircraft: "ボーイング787-9", note: "" },
            { from: "HIH", to: "HND", type: "international", freq: "週14便（日2便）", aircraft: "ボーイング787-9", note: "" },
            { from: "HIH", to: "NGO", type: "international", freq: "週7便（日1便）", aircraft: "エアバスA320neo", note: "" },
            { from: "HIH", to: "KIX", type: "international", freq: "週14便（日2便）", aircraft: "ボーイング787-9", note: "" },
            { from: "HIH", to: "UKB", type: "international", freq: "週7便（日1便）", aircraft: "エアバスA320neo", note: "" },
            { from: "KMN", to: "HND", type: "international", freq: "週7便（日1便）", aircraft: "エアバスA320neo", note: "全便霧原郷里航空・エアセベリッシュとコードシェア" },
            { from: "KMN", to: "KIX", type: "international", freq: "週7便（日1便）", aircraft: "エアバスA320neo", note: "全便霧原郷里航空・エアセベリッシュとコードシェア" },
            { from: "KMN", to: "ICN", type: "international", freq: "週7便（日1便）", aircraft: "エアバスA320neo", note: "全便霧原郷里航空・エアセベリッシュとコードシェア" },
            // 国内線
            { from: "HIH", to: "KSI", type: "domestic", freq: "定期便週42便（日6便）", aircraft: "787-8,A321neo", note: "" },
            { from: "HIH", to: "KRH", type: "domestic", freq: "定期便週42便（日6便）", aircraft: "787-8", note: "全便霧原郷里航空とコードシェア" },
            { from: "HIH", to: "AKO", type: "domestic", freq: "定期便週42便（日6便）", aircraft: "787-8,A321neo", note: "" }
        ]
    }
};
