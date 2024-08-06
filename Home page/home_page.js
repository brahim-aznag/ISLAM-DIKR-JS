// TODO Add other recititions types
// FIXME fix time length when playing
// FIXME remove all console.log()
// FIXME Add links to the footer

/* ---------------------------- Global Variables ---------------------------- */
let g_globalPlayerThumbnailHasEventListener = false;

/* -------------------------------- JSON DATA ------------------------------- */

let jsonData = {};
// Get all reciters data from mp3quran API: https://www.mp3quran.net/api/v3/reciters?language=ar
let all_reciters_API = {};
// ZIKR reciters with messing data from the API
let ZIKR_reciters = [
    {
        "API_id": 81,
        "name": "فارس عباد",
        "avatar": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/66892e5a542d420b9544ff31_faresAbbad.jpg",
        "country_text": "اليمن",
        "country_flag": "https://flagicons.lipis.dev/flags/4x3/ye.svg",
        "background_image": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c4c96ce3dbda626c8d8cc_fraisIbad.png"
    },
    {
        "API_id": 20,
        "name": "خالد الجليل",
        "avatar": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c3e08214fa2f15f51dd42_khalidAljalil.png",
        "country_text": "السعودية",
        "country_flag": "https://flagicons.lipis.dev/flags/4x3/sa.svg",
        "background_image": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c4c962c4cdea33395116f_khalidAljalil.png"
    },
    {
        "API_id": 253,
        "name": "اسلام صبحي",
        "avatar": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c3e08fea9a713e1835438_islamSoubhi.png",
        "country_text": "مصر",
        "country_flag": "https://flagicons.lipis.dev/flags/4x3/eg.svg",
        "background_image": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c4c965c36cba04ff43a1c_islamSoubhi.png"
    },

    {
        "API_id": 221,
        "name": "رعد محمد الكردي",
        "avatar": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c3e08555f187281d45b09_raadAlkordi.png",
        "country_text": "العراق",
        "country_flag": "https://flagicons.lipis.dev/flags/4x3/iq.svg",
        "background_image": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c4c965c36cba04ff43a1f_raadAlkordi.png"
    },
    {
        "API_id": 30,
        "name": "سعد الغامدي",
        "avatar": "https://uploads-ssl.webflow.com/6697afdf41450cfa9b8390cd/669ba04b83bc6631dbc08192_saadalghamdi.png",
        "country_text": "السعودية",
        "country_flag": "https://flagicons.lipis.dev/flags/4x3/sa.svg",
        "background_image": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c4c9675426f7d57844637_saadRhamdi.png"
    },

    {
        "API_id": 231,
        "name": "هزاع البلوشي",
        "avatar": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c3e08762f962b1a85f1f9_hozaaBaloshi.png",
        "country_text": "عمان",
        "country_flag": "https://flagicons.lipis.dev/flags/4x3/om.svg",
        "background_image": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c4c965d93f7afd3694573_hozaaBaloshi.png"
    },
    {
        "API_id": 163,
        "name": "حاتم فريد الواعر",
        "avatar": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c3e08555f187281d45ae0_HatimFaridWaair.png",
        "country_text": "مصر",
        "country_flag": "https://flagicons.lipis.dev/flags/4x3/eg.svg",
        "background_image": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c4c96cfcf89a426b0258e_HatimFaridWaair.png"
    },

    {
        "API_id": 138,
        "name": "نورين محمد صديق",
        "avatar": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c3e0840917fd0565aa215_nourinMuhamed.png",
        "country_text": "السودان ",
        "country_flag": "https://flagicons.lipis.dev/flags/4x3/sd.svg",
        "background_image": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c4c965a33c8acb6c153a2_nourinMuhamed.png"
    },

    {
        "API_id": 286,
        "name": "حسن صالح",
        "avatar": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c3e081ebc2423ce69b2eb_hassanSalih.png",
        "country_text": "مصر",
        "country_flag": "https://flagicons.lipis.dev/flags/4x3/eg.svg",
        "background_image": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c4c96aa3eae4f11ebe50f_hassanSalih.png"
    },
    {
        "API_id": 51,
        "name": "عبد الباسط عبد الصمد",
        "avatar": "https://cdns-images.dzcdn.net/images/talk/06b711ac6da4cde0eb698e244f5e27b8/1000x1000.jpg",
        "country_text": "مصر",
        "country_flag": "https://flagicons.lipis.dev/flags/4x3/eg.svg",
        "background_image": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c4c9607ffdd8a10776f6a_abdelBasit.png"
    },
    {
        "API_id": 217,
        "name": "بندر بليله",
        "avatar": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c3e091380b00aa3c3a189_bandarBalila.png",
        "country_text": "السعودية",
        "country_flag": "https://flagicons.lipis.dev/flags/4x3/sa.svg",
        "background_image": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c4c9660c58052db1b2fab_bandarBalila.png"
    },
    {
        "API_id": 92,
        "name": "ياسر الدوسري",
        "avatar": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c3e082571da0dae7da443_yasserDossari.png",
        "country_text": "السعودية",
        "country_flag": "https://flagicons.lipis.dev/flags/4x3/sa.svg",
        "background_image": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c4c96ac2373f1d75806ca_yasserDossari.png"
    },
    {
        "API_id": 102,
        "name": "ماهر المعيقلي",
        "avatar": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c3e09f69e5aed5e67b0fd_maherMaaikli.png",
        "country_text": "السعودية",
        "country_flag": "https://flagicons.lipis.dev/flags/4x3/sa.svg",
        "background_image": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c4c96aa3eae4f11ebe509_maherMaaikli.png"
    },
    {
        "API_id": 4,
        "name": "ابو بكر الشاطري",
        "avatar": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c3e09e3f0649cc01cc3ed_aboBakrShatri.png",
        "country_text": "اليمن",
        "country_flag": "https://flagicons.lipis.dev/flags/4x3/ye.svg",
        "background_image": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c4c96aa3eae4f11ebe4c8_aboBakrShatri.png"
    },
    {
        "API_id": 5,
        "name": "أحمد العجمي",
        "avatar": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c3e08762f962b1a85f1cf_ahmedAlijmi.png",
        "country_text": "السعودية",
        "country_flag": "https://flagicons.lipis.dev/flags/4x3/sa.svg",
        "background_image": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c4c96f820102756ccc00a_ahmedAlijmi.png"
    },
    {
        "API_id": 24,
        "name": "خليفة الطنيجي",
        "avatar": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c3e08fea9a713e1835402_khalifaTanji.png",
        "country_text": "الامارات",
        "country_flag": "https://flagicons.lipis.dev/flags/4x3/ae.svg",
        "background_image": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c4c96cfcf89a426b025a8_khalifaTanji.png"
    },
    {
        "API_id": 31,
        "name": "سعود الشريم",
        "avatar": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c3e0840917fd0565aa235_SsaoudSharim.png",
        "country_text": "السعودية",
        "country_flag": "https://flagicons.lipis.dev/flags/4x3/sa.svg",
        "background_image": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c4c96e27ce7e78120ef42_saoudSharim.png"
    },
    {
        "API_id": 86,
        "name": "ناصر القطامي",
        "avatar": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c3e08df1af50dd4b22a8a_nasirKatmi.png",
        "country_text": "السعودية",
        "country_flag": "https://flagicons.lipis.dev/flags/4x3/sa.svg",
        "background_image": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c4c964daf448f92121e7b_nasirKatmi.png"
    },
    {
        "API_id": 12,
        "name": "إدريس أبكر",
        "avatar": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c3e09e3f0649cc01cc3f1_idrissAbkar.png",
        "country_text": "اليمن",
        "country_flag": "https://flagicons.lipis.dev/flags/4x3/ye.svg",
        "background_image": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c4c960314aeb0bed222d1_idrissAbkar.png"
    },
    {
        "API_id": 245,
        "name": "منصور السالمي",
        "avatar": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c3e089cedb1a2012607ff_mansourSalmi.png",
        "country_text": "السعودية",
        "country_flag": "https://flagicons.lipis.dev/flags/4x3/sa.svg",
        "background_image": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c4c96205c676904b2af2d_mansourSalmi.png"
    },
    {
        "API_id": 112,
        "name": "محمد صديق المنشاوي",
        "avatar": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c3e0840917fd0565aa219_MohamedManshawi.png",
        "country_text": "مصر",
        "country_flag": "https://flagicons.lipis.dev/flags/4x3/eg.svg",
        "background_image": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668c4c963e59e7fdb9e59fac_mohamedManshawi.png",
        "correct_server": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/"

    },

]
//NOTE Surah svg 
const ZIKR_svg_suras = [
    {
        "sura_number": 1,
        "sura_name": "الفاتحة",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fa1ace89004c0c6d24_1.svg"
    },
    {
        "sura_number": 2,
        "sura_name": "البقرة",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fa3a69cdb0eabd83be_2.svg"
    },
    {
        "sura_number": 3,
        "sura_name": "آل عمران",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/66880ec86f5292cdfe0fca79_%C3%98%C2%A2%C3%99%E2%80%9E%20%C3%98%C2%B9%C3%99%E2%80%A6%C3%98%C2%B1%C3%98%C2%A7%C3%99%E2%80%A0.svg"
    },
    {
        "sura_number": 4,
        "sura_name": "النساء",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fba30701f1806d920b_4.svg"
    },
    {
        "sura_number": 5,
        "sura_name": "المائدة",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fa3a6d511b01d6db24_5.svg"
    },
    {
        "sura_number": 6,
        "sura_name": "الأنعام",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fa3df6b043c989cd8b_6.svg"
    },
    {
        "sura_number": 7,
        "sura_name": "الأعراف",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fbac8b89acc1d361ae_7.svg"
    },
    {
        "sura_number": 8,
        "sura_name": "الأنفال",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fa1ccde34f66f647e1_8.svg"
    },
    {
        "sura_number": 9,
        "sura_name": "التوبة",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fae410f9ca03688a93_9.svg"
    },
    {
        "sura_number": 10,
        "sura_name": "يونس",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fa8e7e8ee49263d12f_10.svg"
    },
    {
        "sura_number": 11,
        "sura_name": "هود",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fa3894fd79cce8ebe9_11.svg"
    },
    {
        "sura_number": 12,
        "sura_name": "يوسف",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fa80d3c2cc6aea4603_12.svg"
    },
    {
        "sura_number": 13,
        "sura_name": "الرعد",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fa3d75a27701a5a7c5_13.svg"
    },
    {
        "sura_number": 14,
        "sura_name": "إبراهيم",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fa9e9b089059507e86_14.svg"
    },
    {
        "sura_number": 15,
        "sura_name": "الحجر",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fa1b574c140475350d_15.svg"
    },
    {
        "sura_number": 16,
        "sura_name": "النحل",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810faa885f70b30e18788_16.svg"
    },
    {
        "sura_number": 17,
        "sura_name": "الإسراء",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fab6997b0ae5e12ca1_17.svg"
    },
    {
        "sura_number": 18,
        "sura_name": "الكهف",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fb783bb361c78938e3_18.svg"
    },
    {
        "sura_number": 19,
        "sura_name": "مريم",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fababf36e28a3d3fd7_19.svg"
    },
    {
        "sura_number": 20,
        "sura_name": "طه",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fa66a5578ae4d2d49e_20.svg"
    },
    {
        "sura_number": 21,
        "sura_name": "الأنبياء",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fab35d8716d1dbffb4_21.svg"
    },
    {
        "sura_number": 22,
        "sura_name": "الحج",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fa6a519405a9a66802_22.svg"
    },
    {
        "sura_number": 23,
        "sura_name": "المؤمنون",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fa66a5578ae4d2d4a2_23.svg"
    },
    {
        "sura_number": 24,
        "sura_name": "النور",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fa3a69cdb0eabd83dd_24.svg"
    },
    {
        "sura_number": 25,
        "sura_name": "الفرقان",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fa065297c6aa61dd09_25.svg"
    },
    {
        "sura_number": 26,
        "sura_name": "الشعراء",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fababf36e28a3d400f_26.svg"
    },
    {
        "sura_number": 27,
        "sura_name": "النمل",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fbff28057949deac7d_27.svg"
    },
    {
        "sura_number": 28,
        "sura_name": "القصص",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fa74492b82a8e4859c_28.svg"
    },
    {
        "sura_number": 29,
        "sura_name": "العنكبوت",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fc803ea205f375b919_29.svg"
    },
    {
        "sura_number": 30,
        "sura_name": "الروم",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fabf8921ef7535da91_30.svg"
    },
    {
        "sura_number": 31,
        "sura_name": "لقمان",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fa78d4e0d0ff069266_31.svg"
    },
    {
        "sura_number": 32,
        "sura_name": "السجدة",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fab6997b0ae5e12cdc_32.svg"
    },
    {
        "sura_number": 33,
        "sura_name": "الأحزاب",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fbdd87ea3ecc8f4d76_33.svg"
    },
    {
        "sura_number": 34,
        "sura_name": "سبأ",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fb880ee1833efe858f_34.svg"
    },
    {
        "sura_number": 35,
        "sura_name": "فاطر",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fae714dff7058cb0ac_35.svg"
    },
    {
        "sura_number": 36,
        "sura_name": "يس",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fa61e5fc2d4dd886dc_36.svg"
    },
    {
        "sura_number": 37,
        "sura_name": "الصافات",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fab05db3ab43aee853_37.svg"
    },
    {
        "sura_number": 38,
        "sura_name": "ص",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810faa25bc177fb0ceb32_38.svg"
    },
    {
        "sura_number": 39,
        "sura_name": "الزمر",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810faf2e9d0fead0f6c2e_39.svg"
    },
    {
        "sura_number": 40,
        "sura_name": "غافر",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fa02cf89c8a9a0c597_40.svg"
    },
    {
        "sura_number": 41,
        "sura_name": "فصلت",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fbb35d8716d1dbfffb_41.svg"
    },
    {
        "sura_number": 42,
        "sura_name": "الشورى",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fbea9d2057231f59d2_42.svg"
    },
    {
        "sura_number": 43,
        "sura_name": "الزخرف",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fbd0263e7571c972c2_43.svg"
    },
    {
        "sura_number": 44,
        "sura_name": "الدخان",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fba5febb3d129081ed_44.svg"
    },
    {
        "sura_number": 45,
        "sura_name": "الجاثية",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fbbfbe8ef2280d77f3_45.svg"
    },
    {
        "sura_number": 46,
        "sura_name": "الأحقاف",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fb3d75a27701a5a89e_46.svg"
    },
    {
        "sura_number": 47,
        "sura_name": "محمد",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fb9f389e8a749a42f6_47.svg"
    },
    {
        "sura_number": 48,
        "sura_name": "الفتح",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fb7f0139284bc536a3_48.svg"
    },
    {
        "sura_number": 49,
        "sura_name": "الحجرات",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fb7b91710b425a1fd4_49.svg"
    },
    {
        "sura_number": 50,
        "sura_name": "ق",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fb80d3c2cc6aea463a_50.svg"
    },
    {
        "sura_number": 51,
        "sura_name": "الذاريات",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fb111bf3556fc1a4da_51.svg"
    },
    {
        "sura_number": 52,
        "sura_name": "الطور",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fb6d77342f14ab1bbd_52.svg"
    },
    {
        "sura_number": 53,
        "sura_name": "النجم",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fb018c601d131b42bb_53.svg"
    },
    {
        "sura_number": 54,
        "sura_name": "القمر",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fb9e9b089059507ebf_54.svg"
    },
    {
        "sura_number": 55,
        "sura_name": "الرحمن",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fbffc4960e9503fdda_55.svg"
    },
    {
        "sura_number": 56,
        "sura_name": "الواقعة",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fbffc4960e9503fdcc_56.svg"
    },
    {
        "sura_number": 57,
        "sura_name": "الحديد",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fba5e138c07fd49e6d_57.svg"
    },
    {
        "sura_number": 58,
        "sura_name": "المجادلة",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fb9fccf149636b1b8a_58.svg"
    },
    {
        "sura_number": 59,
        "sura_name": "الحشر",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fb37c0b5e405875109_59.svg"
    },
    {
        "sura_number": 60,
        "sura_name": "الممتحنة",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fb261d9e42cd81af4a_60.svg"
    },
    {
        "sura_number": 61,
        "sura_name": "الصف",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fcecd571f488c24dd6_61.svg"
    },
    {
        "sura_number": 62,
        "sura_name": "الجمعة",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fca30701f1806d93fa_62.svg"
    },
    {
        "sura_number": 63,
        "sura_name": "المنافقون",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fb3a6d511b01d6db45_63.svg"
    },
    {
        "sura_number": 64,
        "sura_name": "التغابن",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fbe714dff7058cb0e5_64.svg"
    },
    {
        "sura_number": 65,
        "sura_name": "الطلاق",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fbbe0171d4d19c36e0_65.svg"
    },
    {
        "sura_number": 66,
        "sura_name": "التحريم",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fc783bb361c78939cd_66.svg"
    },
    {
        "sura_number": 67,
        "sura_name": "الملك",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fb22a3507596e79cf8_67.svg"
    },
    {
        "sura_number": 68,
        "sura_name": "القلم",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fbc950d8f143da9ab1_68.svg"
    },
    {
        "sura_number": 69,
        "sura_name": "الحاقة",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fb633a337c162f081a_69.svg"
    },
    {
        "sura_number": 70,
        "sura_name": "المعارج",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fb6d77342f14ab1c3e_70.svg"
    },
    {
        "sura_number": 71,
        "sura_name": "نوح",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fba5e138c07fd49eb8_71.svg"
    },
    {
        "sura_number": 72,
        "sura_name": "الجن",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fce26fb0e0a81526fc_72.svg"
    },
    {
        "sura_number": 73,
        "sura_name": "المزمل",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fb75c1cce8531fadf2_73.svg"
    },
    {
        "sura_number": 74,
        "sura_name": "المدثر",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fc8965e189a7a37475_74.svg"
    },
    {
        "sura_number": 75,
        "sura_name": "القيامة",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fcfa04097fc3c5403f_75.svg"
    },
    {
        "sura_number": 76,
        "sura_name": "الإنسان",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fc0c895bf1edc438b4_76.svg"
    },
    {
        "sura_number": 77,
        "sura_name": "المرسلات",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fc02cf89c8a9a0c620_77.svg"
    },
    {
        "sura_number": 78,
        "sura_name": "النبأ",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fc21e36c3365a5b32f_78.svg"
    },
    {
        "sura_number": 79,
        "sura_name": "النازعات",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fc880ee1833efe85ff_79.svg"
    },
    {
        "sura_number": 80,
        "sura_name": "عبس",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fc22a3507596e79d2e_80.svg"
    },
    {
        "sura_number": 81,
        "sura_name": "التكوير",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fc9c1263e360fdbf15_81.svg"
    },
    {
        "sura_number": 82,
        "sura_name": "الإنفطار",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fc9fccf149636b1c4c_82.svg"
    },
    {
        "sura_number": 83,
        "sura_name": "المطففين",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fcf4ef76dc1c7b0c89_83.svg"
    },
    {
        "sura_number": 84,
        "sura_name": "الإنشقاق",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fce26fb0e0a8152741_84.svg"
    },
    {
        "sura_number": 85,
        "sura_name": "البروج",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fc633a337c162f08e1_85.svg"
    },
    {
        "sura_number": 86,
        "sura_name": "الطارق",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fccdb2d8e2c90b84be_86.svg"
    },
    {
        "sura_number": 87,
        "sura_name": "الأعلى",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fda30701f1806d95b7_87.svg"
    },
    {
        "sura_number": 88,
        "sura_name": "الغاشية",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fcb9f63a83c2c42178_88.svg"
    },
    {
        "sura_number": 89,
        "sura_name": "الفجر",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fc0c895bf1edc43928_89.svg"
    },
    {
        "sura_number": 90,
        "sura_name": "البلد",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fd9f389e8a749a44aa_90.svg"
    },
    {
        "sura_number": 91,
        "sura_name": "الشمس",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fd37c0b5e405875162_91.svg"
    },
    {
        "sura_number": 92,
        "sura_name": "الليل",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fcf91396bedb0ff001_92.svg"
    },
    {
        "sura_number": 93,
        "sura_name": "الضحى",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fc3a69cdb0eabd8546_93.svg"
    },
    {
        "sura_number": 94,
        "sura_name": "الشرح",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fc78d4e0d0ff069661_94.svg"
    },
    {
        "sura_number": 95,
        "sura_name": "التين",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fc9db6cad524db430a_95.svg"
    },
    {
        "sura_number": 96,
        "sura_name": "العلق",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fc21e36c3365a5b3a8_96.svg"
    },
    {
        "sura_number": 97,
        "sura_name": "القدر",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fc1ace89004c0c6e39_97.svg"
    },
    {
        "sura_number": 98,
        "sura_name": "البينة",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fcbd0475e5f29fc287_98.svg"
    },
    {
        "sura_number": 99,
        "sura_name": "الزلزلة",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fc0fa07e263edbdbdf_99.svg"
    },
    {
        "sura_number": 100,
        "sura_name": "العاديات",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fd61e5fc2d4dd88802_100.svg"
    },
    {
        "sura_number": 101,
        "sura_name": "القارعة",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fda5e138c07fd49f59_101.svg"
    },
    {
        "sura_number": 102,
        "sura_name": "التكاثر",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fd1801ae5d22997d94_102.svg"
    },
    {
        "sura_number": 103,
        "sura_name": "العصر",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fdfa04097fc3c5414c_103.svg"
    },
    {
        "sura_number": 104,
        "sura_name": "الهمزة",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fdf2e9d0fead0f6f12_104.svg"
    },
    {
        "sura_number": 105,
        "sura_name": "الفيل",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fdbf8921ef7535dbe0_105.svg"
    },
    {
        "sura_number": 106,
        "sura_name": "قريش",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fd49f675709dc09311_106.svg"
    },
    {
        "sura_number": 107,
        "sura_name": "الماعون",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fdc950d8f143da9bc1_107.svg"
    },
    {
        "sura_number": 108,
        "sura_name": "الكوثر",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fd1abf4ad477189c55_108.svg"
    },
    {
        "sura_number": 109,
        "sura_name": "الكافرون",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fdecd571f488c250e7_109.svg"
    },
    {
        "sura_number": 110,
        "sura_name": "النصر",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fd983b461cdfd2944e_110.svg"
    },
    {
        "sura_number": 111,
        "sura_name": "المسد",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fd065297c6aa61de60_111.svg"
    },
    {
        "sura_number": 112,
        "sura_name": "الإخلاص",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fdefd17bddc063dc61_112.svg"
    },
    {
        "sura_number": 113,
        "sura_name": "الفلق",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fdcf794bea4a4f129f_113.svg"
    },
    {
        "sura_number": 114,
        "sura_name": "الناس",
        "sura_svg": "https://uploads-ssl.webflow.com/6687b54a487f06f0128da746/668810fe7a3b1cd57d3de156_114.svg"
    }
]

async function getReciters_API() {
    try {
        const response = await fetch('https://www.mp3quran.net/api/v3/reciters?language=ar');
        if (!response.ok) {
            throw new Error(`Error fetching reciters: ${response.status}`);
        }
        all_reciters_API = await response.json();
        // console.log(all_reciters_API); // This will log the retrieved JSON data
    } catch (error) {
        console.error("Error:", error);
    }
}

function matchAPIData_with_ZIKRData() {

    all_reciters_API.reciters.forEach(API_reciter => {
        ZIKR_reciters.forEach(ZIKR_reciter => {
            if (API_reciter.id === ZIKR_reciter.API_id) {

                // Copying needed data from API to ZIKR reciters JSON
                // if reciter has no server in its JSON then it will be replaced with server from API
                if (ZIKR_reciter.correct_server) {
                    ZIKR_reciter.server = ZIKR_reciter.correct_server; //reciter suras list
                } else {
                    ZIKR_reciter.server = API_reciter.moshaf[0].server; //reciter suras list

                }
                ZIKR_reciter.surah_total = API_reciter.moshaf[0].surah_total; //reciter total available suras number
                ZIKR_reciter.surah_list = API_reciter.moshaf[0].surah_list.split(",").map(str => parseInt(str)); //reciter suras list + chnaging string "1,2..." to array of numbers [1,2...]
            }
        })
    });

    console.log(ZIKR_reciters)
}


/* --------------------------------- JS CODE -------------------------------- */

// after getting the data from the API > 1 match it with ZIKR Data > 2 rendering reciters block > 3 run mp3 player plugin
getReciters_API().then(() => {
    // removing animated loading
    document.querySelector('#animated-loading').remove();
    ; matchAPIData_with_ZIKRData(); renderingRecitersBlock(); renderReictersNumbers(); runMp3PlayerPlugin(); scrollToCurrentReciterByURL()
});

// ^Rendering ZIKR reciters:---------------------------------------------

// 1: Selecting HTML elements needed to put data on it
const originalReciterBlock = document.querySelector('#reciter-block');// getting the reciter block from HTML
const recitersContainer = document.querySelector('#reciters-container');// selecting reciters contaienr
const originalTrackElement = document.querySelector('#track-item');// Select the original track element
let openedReciterHTML;//get the current track list html element that is opened on the website
// const trackListContainer = document.querySelector('#track-list'); // Container for all track elements


// 2:Putting data on the cloned elements fun
function renderingRecitersBlock() {
    ZIKR_reciters.forEach(currentReciter => {
        // Clone the original reciter block form HTML
        const reciterClone = originalReciterBlock.cloneNode(true);
        reciterClone.id = reciterClone.id + "-" + currentReciter.API_id;
        reciterClone.querySelector('#reciter-name').innerHTML = currentReciter.name;
        reciterClone.querySelector('#country-flag').src = currentReciter.country_flag;
        reciterClone.querySelector('#country-flag').srcset = currentReciter.country_flag;
        reciterClone.querySelector('#country-text').innerHTML = currentReciter.country_text;
        reciterClone.querySelector('#surah-total').innerHTML = currentReciter.surah_total;
        reciterClone.querySelector('#reciter-avatar').src = currentReciter.avatar;
        reciterClone.querySelector('#reciter-avatar').srcset = currentReciter.avatar;
        reciterClone.setAttribute('reciter-state', 'closed');

        // adding functionality to the reciter info (whene clicking it it shows/hides track list)
        reciterClone.querySelector('#track-list-info').addEventListener('click', () => {
            // chnaging the status of the track list based on it it's current state
            openOrCloseReciter(reciterClone);
        });
        // adding functionality to share reciter Button
        reciterClone.querySelector('#share-reciter-btn').onclick = (e) => {
            shareBtnHandler(e, reciterClone.querySelector('#share-reciter-btn'));
        }

        // adding functionality to play reciter Button
        reciterClone.querySelector('#play-reciter-btn').onclick = (e) => {
            playReciterBtnHandler(e, reciterClone.querySelector('#play-reciter-btn'));

        }

        // rendering surah playlist of this current reciter
        renderingSurasList(currentReciter.surah_list, currentReciter, reciterClone);
        // appending reciter block to the HTML
        recitersContainer.appendChild(reciterClone);

    });
    // remove reiter block template from the HTML
    originalReciterBlock.remove();
}

// rendreing suras list in the reciter block fun
function renderingSurasList(currentSurahList, currentReciter, reciterClone) {

    // selecting reciterClone tracklist
    const trackListContainer = reciterClone.querySelector("#track-list");

    // Loop through the Suras list
    currentSurahList.forEach((currentSura, index) => {

        // Clone the original track element
        const trackClone = originalTrackElement.cloneNode(true);

        // get mp3 file link from the server
        const currentSuraMp3Link = `${currentReciter.server}${currentSura.toString().padStart(3, '0')}.mp3`

        // adding event listener to the track item; when the track is clicked shows the global player bellow
        trackClone.addEventListener('click', (e) => {
            document.querySelector('.main-media-player').style.display = "flex";
            document.querySelector('.main-media-player').style.transform = "translate3d(0px, 0px, 0px)";
        });

        // Populate the cloned element with data from the JSON
        trackClone.querySelector('.track-number').textContent = index + 1;
        trackClone.querySelector('.track-title').textContent = ZIKR_svg_suras[currentSura - 1].sura_name;

        // console.log(ZIKR_svg_suras[currentSura - 1].sura_name);
        // console.log(ZIKR_svg_suras[currentSura - 1].sura_svg);
        trackClone.querySelector('.track-thumbnail-surah-svg').src = ZIKR_svg_suras[currentSura - 1].sura_svg;
        trackClone.querySelector('.track-url').innerHTML = currentSuraMp3Link;

        // This for the player plugin data
        trackClone.querySelector('.track-name').textContent = ZIKR_svg_suras[currentSura - 1].sura_name;
        trackClone.querySelector('.track-genres').textContent = "سورة";
        trackClone.querySelector('.track-image').src = ZIKR_svg_suras[currentSura - 1].sura_svg;
        trackClone.querySelector('#track-item-bg').style.backgroundImage = `url(${currentReciter.background_image})`;

        // Append the cloned element to the container
        trackListContainer.appendChild(trackClone);
        trackListContainer.style.display = "none";
        // trackListContainer.setAttribute('ZIKR-recite-state', 'closed');

        // FIXME: see how you can get durations
        // Getting the duration of the mp3 audio as hh:mm:ss
        // fetchAudioDuration(currentSuraMp3Link).then(duration => {
        //     //appending duration in HTML after formatting it like this hh:mm:ss
        //     trackClone.querySelector('.track-time').innerHTML = formatDuration(duration);
        // });
    });

    // remove original track element Template from the HTML
    trackListContainer.firstElementChild.remove();
}


// Redering Reciters number
function renderReictersNumbers() {
    let recitersBlockslist = recitersContainer.querySelectorAll('.reciter-block');
    recitersBlockslist = Array.from(recitersBlockslist);

    recitersBlockslist.forEach((reciterBlockHTML, index) => {
        reciterBlockHTML.querySelector("#reciter-number").innerHTML = index + 1;
        // making zikr badge gray if order > 4
        if (index + 1 > 4) {
            reciterBlockHTML.querySelector("#zikr-badge").style.color = "#ffffffa6";
            reciterBlockHTML.querySelector("#zikr-badge").style.background = "rgb(163 163 163 / 22%)";
            reciterBlockHTML.querySelector("#badge-icon").style.display = "none";

        }

    })
}


//^--------------------------------------------------------------------


// hide the badge
// document.querySelector('.w-webflow-badge').remove();







/* ----------------------------------- /FUNCTIONS/ ----------------------------------- */




function closeReciter(reciter) {
    // Close opened reaciter
    reciter.setAttribute('reciter-state', 'closed');
    reciter.querySelector('#track-list').style.display = "none";
    reciter.style.gridRow = "span 1";//shrink reciter block HTML (inside grid)
    reciter.style.border = "";
    reciter.style.boxShadow = "";
    reciter.style.background = "";
}

function openReciter(reciter) {
    // open closed reciter
    reciter.setAttribute('reciter-state', 'opened');
    reciter.querySelector('#track-list').style.display = "flex";
    reciter.style.gridRow = "span 3"; //Expand reciter block HTML (inside grid)
    reciter.style.border = "2px solid rgba(255, 178, 28, 0.45)";
    reciter.style.boxShadow = "rgba(255, 187, 0, 0.34) 0px 0px 20px 0px";
    reciter.style.background = "#ffffff1a";
}

function openOrCloseReciter(clickedReciter) {
    // chnaging the status of the track list based on it it's current state
    if (clickedReciter.getAttribute("reciter-state") == "closed") {
        // close previews track list if there's any
        if (document.querySelector('[reciter-state="opened"]')) {
            openedReciterHTML = document.querySelector('[reciter-state="opened"]');
            // Close opened reaciter
            closeReciter(openedReciterHTML);
        }
        // open clicked current reciter
        openReciter(clickedReciter)

    } else {
        closeReciter(clickedReciter);
    }
}


function runMp3PlayerPlugin() {
    // Create a <script> element
    const script = document.createElement('script');
    script.src = 'https://trueaudioplayer.b-cdn.net/true-audio-player@1.1.1.min.js'; //orginal script
    // script.src = 'https://wdl77h-5000.csb.app/true_audio_player_edited.js'; // edited script by brahim
    // Append the <script> element to the <head>
    document.head.appendChild(script);
}


// Function to fetch the audio file and get its duration
function fetchAudioDuration(url) {
    return new Promise((resolve, reject) => {
        const audio = new Audio(url);
        audio.addEventListener('loadedmetadata', () => {
            resolve(audio.duration);
        });
        audio.addEventListener('error', (e) => {
            reject(e);
        });
    });
}


// Function to format the duration in hh:mm:ss or mm:ss
function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

    if (hours > 0) {
        const formattedHours = hours < 10 ? '0' + hours : hours;
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    } else {
        return `${formattedMinutes}:${formattedSeconds}`;
    }
}

// this function scrolls to the current track item in the reciter block
function scrollToCurrentTrackItem() {
    const f_currentTrackItem = document.querySelector('#track-item.is-current');
    const f_currentReciter = f_currentTrackItem.closest('[reciter-state]');

    // Check if the element exists
    if (f_currentTrackItem) {
        // first close any other reciter if there's one
        if (document.querySelector('[reciter-state="opened"]')) {
            closeReciter(document.querySelector('[reciter-state="opened"]'));
        }
        // Scroll the element into view while opeining the ricter block
        openReciter(f_currentReciter);
        f_currentTrackItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}


// go to the current reciter block based on URL if it exists
function scrollToCurrentReciterByURL() {
    // check if the URL has ID if a reciter like https://islam-dikr.com/#reciter-block%2020
    if (window.location.hash) {
        // change URL to reciter ID
        const url = window.location.hash;
        let cleanedUrl = url.replace("#", "");
        // scroll to reciter block that was mention in the URL
        document.getElementById(`${cleanedUrl}`).scrollIntoView({ behavior: 'smooth', block: 'center' });

        document.getElementById(`${cleanedUrl}`).querySelector("#track-list-info").click();
        // setTimeout(() => {
        //     document.getElementById(`${cleanedUrl}`).style.background = "transparent"
        // }, 2000);
        // scroll to reciter block that was mention in the URL
    }
}

/**
 * Handles the click event on the share button.
 * Copies the URL of the current reciter block to the clipboard.
 * Changes the button text and style temporarily.
 * After a delay, restores the original button state.
 *
 * @param {Event} e - The click event.
 * @param {HTMLElement} currentShareBtn - The share button element.
 */
function shareBtnHandler(e, currentShareBtn) {
    // Prevents the event from bubbling up the DOM tree.
    e.stopPropagation();

    // Get the ID of the current reciter block.
    const current_btn = currentShareBtn;
    const currentReciterID = current_btn.closest(".reciter-block").id;
    //copy + domain url + currentReciterID to clipboard to be like this: https://islam-dikr.com/#reciter-lock-32
    navigator.clipboard.writeText(window.location.origin + "/#" + currentReciterID);
    const btn_original_text = current_btn.innerHTML;
    current_btn.style.opacity = "0.4"
    current_btn.style.color = "white"
    current_btn.innerHTML = "تم نسخ الرابط";

    // Constructs the URL by concatenating the current domain and reciter ID.
    const url = window.location.origin + "/#" + currentReciterID;

    // Copies the URL to the clipboard.
    navigator.clipboard.writeText(url);

    // Stores the original button text.
    //return back to original button state
    // Changes the button text, style, and opacity.
    current_btn.style.opacity = "0.4";
    current_btn.style.color = "white";
    current_btn.style.cursor = "not-allowed";

    setTimeout(() => {
        // After a delay, restores the original button state.
        current_btn.innerHTML = btn_original_text;
        current_btn.style.opacity = "1"
        current_btn.style.cursor = "pointer";

    }, 500);
}


/**
 * Handles the click event on the play reciter button.
 * plays reciter's surah.
 *
 * @param {Event} e - The click event.
 * @param {HTMLElement} currentPlayReciterBtn - The play reciter button element.
 */
function playReciterBtnHandler(e, currentPlayReciterBtn) {
    // Flag to track if the button was clicked to play.
    // let btnWasClickedToPlay = false;
    e.stopPropagation(); // Prevents the event from bubbling up the DOM tree.

    //enable previews play reciter button
    const disabledBtn = document.querySelector('[zikr-play-btn-state="disabled"]');

    console.log(disabledBtn);
    if (disabledBtn && disabledBtn !== currentPlayReciterBtn) {
        disabledBtn.setAttribute('zikr-play-btn-state', 'enabled')
        disabledBtn.style.opacity = "1"
        disabledBtn.style.cursor = "pointer"
    }


    // selecting the current play reciter button
    const current_btn = currentPlayReciterBtn;
    if (current_btn.closest(".reciter-block").getAttribute("reciter-state") == "closed") {
        current_btn.closest("#track-list-info").click();//open track list   
    }
    // play surah
    if (current_btn.getAttribute("zikr-play-btn-state") == "enabled") {
        current_btn.closest(".reciter-block").querySelector("#surah").click(); //play surah
    }
    // disable play reciter button
    current_btn.setAttribute('zikr-play-btn-state', 'disabled');
    current_btn.style.opacity = "0.2"
    current_btn.style.cursor = "not-allowed"





}

/* ----------------------------------- /Observer/ ----------------------------------- */

// Function to refresh the thubnail of global plaer that came from element with the class 'track-item is-current'
function updateGlobalPlayerThumbnail(mutationsList, observer) {
    mutationsList.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const target = mutation.target;
            if (target.classList.contains('track-item') && target.classList.contains('is-current')) {

                // Updatting the thumbnail to the global player
                document.querySelector('#global-player-thumbnail-js').innerHTML = target.querySelector('.track-thumbnail').outerHTML;

                // Adding event listener to the global player thumbnail (so when clicking on it it gos back to the track item)
                if (!g_globalPlayerThumbnailHasEventListener) {
                    document.querySelector('#global-player-thumbnail-js').addEventListener('click', scrollToCurrentTrackItem);
                    g_globalPlayerThumbnailHasEventListener = true;
                }
            }
        }
    });
}

// Create a MutationObserver instance and pass the callback function
const observer = new MutationObserver(updateGlobalPlayerThumbnail);

// Define the element to observe (e.g., the document body)
const targetNode = document.body;

// Options for the observer (which mutations to observe)
const config = {
    attributes: true, // Listen for changes to attributes
    subtree: true,    // Include all descendants in the observation
    attributeFilter: ['class'] // Only observe changes to the 'class' attribute
};

// Start observing the target node for configured mutations
observer.observe(targetNode, config);


