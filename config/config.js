import { FileHost, Review, Agency, CalendarCheck, Users, Category, Proxybots, Management, PingModels, AutoContract, Bing, SMScanner, Submit, UserContent, Search, AIProfile, DataReport, DmcaBadges, AccountSetting, DownloadData, SidebarClose, Notification, Scanner, Photo, ProfileSquare, WarningCircle, TestBots, KeywordsDataSet, HelpPost } from "@/components/utils/Icons";

export const ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT
export const BOT_ENDPOINT = process.env.NEXT_PUBLIC_BOT_API_ENDPOINT

const icons = {
  filehost: <FileHost fill="currentColor" size={16} />,
  calendarcheck: <CalendarCheck fill="currentColor" size={16} />,
  category: <Category fill="currentColor" size={16} />,
  SMscanner: <SMScanner fill="currentColor" size={16} />,
  submit: <Submit fill="currentColor" size={16} />,
  usercontent: <UserContent fill="currentColor" size={16} />,
  AIProfile: <AIProfile fill="currentColor" size={16} />,
  DataReport: <DataReport fill="currentColor" size={16} />,
  dmcabadges: <DmcaBadges fill="currentColor" size={16} />,
  AccountSetting: <AccountSetting fill="currentColor" size={16} />,
  DownloadData: <DownloadData fill="currentColor" size={16} />,
  notification: <Notification fill="currentColor" size={16} />,
  scanner: <Scanner fill="currentColor" size={16} />,
  photo: <Photo fill="currentColor" size={16} />,
  profilesquare: <ProfileSquare fill="currentColor" size={16} />,
  warningcircle: <WarningCircle fill="currentColor" size={16} />,
  search: <Search fill="currentColor" size={16} />,
  sidebarclose: <SidebarClose fill="currentColor" size={16} />,
  testbots: <TestBots fill="currentColor" size={16} />,
  users: <Users fill="currentColor" size={16} />,
  proxybots: <Proxybots fill="currentColor" size={16} />,
  management: <Management fill="currentColor" size={16} />,
  pingmodels: <PingModels fill="currentColor" size={16} />,
  autocontract: <AutoContract fill="currentColor" size={16} />,
  bing: <Bing fill="currentColor" size={16} />,
  keywordsDataSet: <KeywordsDataSet fill="currentColor" size={16} />,
  helpPost: <HelpPost fill="currentColor" size={16} />,
  review: <Review fill="currentColor" size={16} />,
  agency: <Agency fill="currentColor" size={16} />,
};

export const USER_SIDEBAR_LIST = [
  {
    id: 0,
    icon: icons.category,
    title: "DASHBOARD",
    path: "/app/dashboard",
    favourite: false
  }, {
    id: 1,
    icon: icons.scanner,
    value: 'scanner',
    title: "SCANNER",
    path: "/app/scanner",
    favourite: false
  }, {
    id: 2,
    icon: icons.warningcircle,
    title: "ADULT Tubs",
    value: 'adult_tubs',
    path: "/app/adult-tubs",
    favourite: false
  }, {
    id: 3,
    icon: icons.filehost,
    title: "FILE HOSTED",
    value: 'file_hosted',
    path: "/app/file-hosted",
    favourite: false
  }, {
    id: 4,
    icon: icons.search,
    title: "GOOGLE",
    value: 'google',
    path: "/app/google",
    favourite: false
  }, {
    id: 5,
    icon: icons.search,
    title: "BING",
    value: 'bing',
    path: "/app/bing",
    favourite: false
  }, {
    id: 6,
    icon: icons.photo,
    title: "AI FACE IMAGES",
    value: 'ai_face_images',
    path: "/app/ai-face-images",
    favourite: false
  }, {
    id: 7,
    icon: icons.AIProfile,
    title: "AI FACE PROFILES",
    value: 'ai_face_profiles',
    path: "/app/ai-face-profile",
    favourite: false
  }, {
    id: 8,
    icon: icons.SMscanner,
    title: "SM SCANNER",
    value: 'sm_scanner',
    path: "/app/sm-scanner",
    favourite: false
  }, {
    id: 9,
    icon: icons.submit,
    title: "SM SUBMIT",
    value: 'sm_submit',
    path: "/app/sm-submit",
    favourite: false
  }, {
    id: 10,
    icon: icons.usercontent,
    title: "R&R OF USER CONTENT",
    value: 'r2r_of_user_content',
    path: "/app/recovery-user",
    favourite: false
  }, {
    id: 11,
    icon: icons.AIProfile,
    title: "DMCA BADGES",
    value: 'dmca_badges',
    path: "/app/dmcabadges",
    favourite: false
  }, {
    id: 12,
    icon: icons.DataReport,
    title: "DATA REPORT",
    value: 'data_report',
    path: "/app/report",
    favourite: false
  }, {
    id: 13,
    icon: icons.calendarcheck,
    title: "DATA ANALYTICS",
    value: 'data_analytics',
    path: "/app/analytics",
    favourite: false
  }, {
    id: 14,
    icon: icons.AIProfile,
    title: "PERSONAL AGENT",
    value: 'personal_agent',
    path: "/app/personal-agent",
    favourite: false
  }, {
    id: 15,
    icon: icons.AccountSetting,
    title: "ACCOUNT SETTINGS",
    path: "/app/setting",
    favourite: false
  }, {
    id: 16,
    icon: icons.DownloadData,
    title: "DOWNLOAD DATA",
    value: 'download_data',
    path: "/app/download",
    favourite: false
  }, {
    id: 17,
    icon: icons.notification,
    title: "NOTIFICATION",
    path: "/app/notification",
    favourite: false
  }
];

export const ADMIN_SIDEBAR_LIST = [
  {
    icon: icons.category,
    title: "DASHBOARD",
    path: "/admin/dashboard",
    favourite: false
  }, {
    icon: icons.scanner,
    title: "SCANNER",
    path: "/admin/scanner",
    favourite: false
  }, {
    icon: icons.search,
    title: "GOOGLE & BING",
    path: "/admin/google-bing",
    favourite: false
  }, {
    icon: icons.AIProfile,
    title: "ARTIFICIAL INTELLIGENCE",
    path: "/admin/ai-face",
    favourite: false
  }, {
    icon: icons.submit,
    title: "SOCIAL MEDIA",
    path: "/admin/social-media",
    favourite: false
  }, {
    icon: icons.agency,
    title: "AGENCY",
    path: "/admin/agency",
    favourite: false
  }, {
    icon: icons.AIProfile,
    title: "PERSONAL AGENT",
    path: "/admin/personal-agent",
    favourite: false
  }, {
    icon: icons.usercontent,
    title: "R&R OF USER CONTENT",
    path: "/admin/ruser-content",
    favourite: false
  }, {
    icon: icons.AIProfile,
    title: "DMCA BADGES",
    path: "/admin/dmcabadges",
    favourite: false
  }, {
    icon: icons.calendarcheck,
    title: "DATA ANALYTICS",
    path: "/admin/analytics",
    favourite: false
  }, {
    icon: icons.DataReport,
    title: "DATA REPORT",
    path: "/admin/data-report",
    favourite: false
  }, {
    icon: icons.testbots,
    title: "TEST BOTS",
    path: "/admin/test-bots",
    favourite: false
  }, {
    icon: icons.users,
    title: "USERS",
    path: "/admin/users",
    favourite: false
  }, {
    icon: icons.proxybots,
    title: "PROXIES/VPS",
    path: "/admin/proxies-vps",
    favourite: false
  }, {
    icon: icons.management,
    title: "VPS MANAGEMENT",
    path: "/admin/vps-management",
    favourite: false
  }, {
    icon: icons.management,
    title: "REPORTS MANAGEMENT",
    path: "/admin/report-management",
    favourite: false
  }, {
    icon: icons.review,
    title: "REVIEWS MANAGEMENT",
    path: "/admin/review",
    favourite: false
  }, {
    icon: icons.pingmodels,
    title: "PING MODELS",
    path: "/admin/ping-models",
    favourite: false
  }, {
    icon: icons.keywordsDataSet,
    title: "KEYWORDS DATASET",
    path: "/admin/keywords",
    favourite: false
  }, {
    icon: icons.autocontract,
    title: "AUTO-CONTRACT",
    path: "/admin/auto-contract",
    favourite: false
  }, {
    icon: icons.bing,
    title: "BLOG",
    path: "/admin/blog",
    favourite: false
  }, {
    icon: icons.bing,
    title: "NEWSLETTER",
    path: "/admin/news",
    favourite: false
  }, {
    icon: icons.helpPost,
    title: "HELP",
    path: "/admin/help",
    favourite: false
  }, {
    icon: icons.notification,
    title: "NOTIFICATION",
    path: "/admin/notifications",
    favourite: false
  }
]