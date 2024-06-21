import { FileHost, Review, Agency, CalendarCheck, Users, Category, Proxybots, Management, PingModels, AutoContract, Bing, SMScanner, Submit, UserContent, Search, AIProfile, DataReport, DmcaBadges, AccountSetting, DownloadData, SidebarClose, Notification, Scanner, Photo, ProfileSquare, WarningCircle, TestBots, KeywordsDataSet, HelpPost } from "@/components/utils/Icons";

export const ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT
export const BOT_ENDPOINT = process.env.NEXT_PUBLIC_BOT_API_ENDPOINT

const icons = {
  filehost: <FileHost />,
  calendarcheck: <CalendarCheck />,
  category: <Category />,
  SMscanner: <SMScanner />,
  submit: <Submit />,
  usercontent: <UserContent />,
  AIProfile: <AIProfile />,
  DataReport: <DataReport />,
  dmcabadges: <DmcaBadges />,
  AccountSetting: <AccountSetting />,
  DownloadData: <DownloadData />,
  scanner: <Scanner />,
  photo: <Photo />,
  profilesquare: <ProfileSquare />,
  warningcircle: <WarningCircle />,
  search: <Search />,
  sidebarclose: <SidebarClose />,
  testbots: <TestBots />,
  users: <Users />,
  proxybots: <Proxybots />,
  management: <Management />,
  pingmodels: <PingModels />,
  autocontract: <AutoContract />,
  bing: <Bing />,
  keywordsDataSet: <KeywordsDataSet />,
  helpPost: <HelpPost />,
  review: <Review />,
  agency: <Agency />,
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
    title: "ADULT TUBES",
    value: 'adult_tubs',
    path: "/app/adult-tubes",
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
    title: "AI FACE",
    value: 'ai_face',
    path: "/app/ai-face",
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
    icon: icons.AIProfile,
    title: "PERSONAL AGENT",
    value: 'personal_agent',
    path: "/app/personal-agent",
    favourite: false
  }, {
    id: 13,
    icon: icons.AccountSetting,
    title: "ACCOUNT SETTINGS",
    path: "/app/settings",
    favourite: false
  }, {
    id: 14,
    icon: icons.DownloadData,
    title: "DOWNLOAD DATA",
    value: 'download_data',
    path: "/app/download",
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
    title: "REPORT & ANALYTICS",
    path: "/admin/report-analytics",
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
    title: "CONTRACT & COPYRIGHT",
    path: "/admin/contract-copyright",
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
  }
]


export const MODERATOR_SIDEBAR_LIST = [
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
    icon: icons.keywordsDataSet,
    title: "KEYWORDS DATASET",
    path: "/admin/keywords",
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
  }
]

export const SUBSCRIPTION_NAMES = [
  '',
  'Trial',
  'Starter',
  'Pro',
  'Star'
]

export const DEFAULT_SCAN_RESULT = {
  total_google_links: 0,
  total_google_images: 0,
  total_google_videos: 0,
  total_bing_links: 0,
  total_bing_images: 0,
  total_bing_videos: 0,
  good_count: 0,
  other_count: 0,
  bad_count: 0,
  new_count: 0,
  report_count: 0,
  no_report_count: 0,
  matches_count: 0,
  no_matches_count: 0,
  status: 'available'
}