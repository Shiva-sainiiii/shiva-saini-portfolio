// Services ke liye simple line icons (currentColor, .svc-ico ke andar dikhte hain)
const S = ({ size = 30, children, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>{children}</svg>
);
export const AutomationIcon = (p) => (<S {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></S>);
export const CrmIcon = (p) => (<S {...p}><circle cx="9" cy="8" r="3.2" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" /><path d="M16 5.2a3 3 0 0 1 0 5.6M18.5 14.4c1.9.8 3 2.6 3 5.6" /></S>);
export const ChatbotIcon = (p) => (<S {...p}><path d="M21 12a8 8 0 0 1-11.6 7.1L3 20.5l1.4-4.5A8 8 0 1 1 21 12z" /><circle cx="9" cy="12" r=".9" fill="currentColor" /><circle cx="12.5" cy="12" r=".9" fill="currentColor" /><circle cx="16" cy="12" r=".9" fill="currentColor" /></S>);
export const DashboardIcon = (p) => (<S {...p}><rect x="3" y="3" width="8" height="9" rx="2" /><rect x="13" y="3" width="8" height="5" rx="2" /><rect x="13" y="11" width="8" height="10" rx="2" /><rect x="3" y="15" width="8" height="6" rx="2" /></S>);
export const SearchIcon = (p) => (<S {...p}><circle cx="10.5" cy="10.5" r="6.5" /><path d="m20 20-4.9-4.9" /><path d="M8 12.5l2-2.5 1.5 1.5L14 8.5" /></S>);
export const CloudIcon = (p) => (<S {...p}><path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 17.9 8.6 4.7 4.7 0 0 1 17.5 18z" /></S>);
