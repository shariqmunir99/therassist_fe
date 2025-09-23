import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "./ui/sidebar";
import { therapistSidebar } from "@/lib/constants";
import Image from "next/image";
import CustomSidebarFooter from "./CustomSidebarFooter";

const CustomSidebar = () => {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="">
              {therapistSidebar.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="p-3 py-7">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={24}
                        height={24}
                      ></Image>

                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <CustomSidebarFooter></CustomSidebarFooter>
    </Sidebar>
  );
};

export default CustomSidebar;

{
  /* <div className="layout-content-container flex flex-col w-80">
        <div className="flex h-full min-h-[700px] flex-col justify-between bg-slate-50 p-4">
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAYrQ_Tio1K2R6AK3Sg5cxVQVIcse0HsjG1mGonz10Ys_CwIE6aPfmJ4zb_6O9rcMNhUao9n6CILRtDoYwkf0YtWY8qYNvIj_0PlXfwf7s1ey1QGmjbdAmPOODJ64-nZ7Kkb2kq5JTSxlEZ01GRJ2OR5euaRo-aW4hy8hL-5rADrahDHXO4UeqL6fZPkbPIddr1q--DI-OKcknifGfvB93NCtXQBQ9j5AsZJj5mKHHa0vuPHSMo0XJZbouy00bbFWOKSZXd70pkQ0w")',
                }}
              />
              <h1 className="text-[#0e131b] text-base font-medium leading-normal">
                Therapy Platform
              </h1>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 px-3 py-2">
                <div
                  className="text-[#0e131b]"
                  data-icon="House"
                  data-size="24px"
                  data-weight="regular"
                >
                  <svg
                    fill="currentColor"
                    height="24px"
                    viewBox="0 0 256 256"
                    width="24px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z" />
                  </svg>
                </div>
                <p className="text-[#0e131b] text-sm font-medium leading-normal">
                  Dashboard
                </p>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[#e7ecf3]">
                <div
                  className="text-[#0e131b]"
                  data-icon="Users"
                  data-size="24px"
                  data-weight="fill"
                >
                  <svg
                    fill="currentColor"
                    height="24px"
                    viewBox="0 0 256 256"
                    width="24px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M164.47,195.63a8,8,0,0,1-6.7,12.37H10.23a8,8,0,0,1-6.7-12.37,95.83,95.83,0,0,1,47.22-37.71,60,60,0,1,1,66.5,0A95.83,95.83,0,0,1,164.47,195.63Zm87.91-.15a95.87,95.87,0,0,0-47.13-37.56A60,60,0,0,0,144.7,54.59a4,4,0,0,0-1.33,6A75.83,75.83,0,0,1,147,150.53a4,4,0,0,0,1.07,5.53,112.32,112.32,0,0,1,29.85,30.83,23.92,23.92,0,0,1,3.65,16.47,4,4,0,0,0,3.95,4.64h60.3a8,8,0,0,0,7.73-5.93A8.22,8.22,0,0,0,252.38,195.48Z" />
                  </svg>
                </div>
                <p className="text-[#0e131b] text-sm font-medium leading-normal">
                  Clients
                </p>
              </div>
              <div className="flex items-center gap-3 px-3 py-2">
                <div
                  className="text-[#0e131b]"
                  data-icon="Calendar"
                  data-size="24px"
                  data-weight="regular"
                >
                  <svg
                    fill="currentColor"
                    height="24px"
                    viewBox="0 0 256 256"
                    width="24px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136,23.76,23.76,0,0,1,171.16,150.45Z" />
                  </svg>
                </div>
                <p className="text-[#0e131b] text-sm font-medium leading-normal">
                  Sessions
                </p>
              </div>
              <div className="flex items-center gap-3 px-3 py-2">
                <div
                  className="text-[#0e131b]"
                  data-icon="Note"
                  data-size="24px"
                  data-weight="regular"
                >
                  <svg
                    fill="currentColor"
                    height="24px"
                    viewBox="0 0 256 256"
                    width="24px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M88,96a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H96A8,8,0,0,1,88,96Zm8,40h64a8,8,0,0,0,0-16H96a8,8,0,0,0,0,16Zm32,16H96a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16ZM224,48V156.69A15.86,15.86,0,0,1,219.31,168L168,219.31A15.86,15.86,0,0,1,156.69,224H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM48,208H152V160a8,8,0,0,1,8-8h48V48H48Zm120-40v28.7L196.69,168Z" />
                  </svg>
                </div>
                <p className="text-[#0e131b] text-sm font-medium leading-normal">
                  Notes
                </p>
              </div>
              <div className="flex items-center gap-3 px-3 py-2">
                <div
                  className="text-[#0e131b]"
                  data-icon="PresentationChart"
                  data-size="24px"
                  data-weight="regular"
                >
                  <svg
                    fill="currentColor"
                    height="24px"
                    viewBox="0 0 256 256"
                    width="24px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M216,40H136V24a8,8,0,0,0-16,0V40H40A16,16,0,0,0,24,56V176a16,16,0,0,0,16,16H79.36L57.75,219a8,8,0,0,0,12.5,10l29.59-37h56.32l29.59,37a8,8,0,1,0,12.5-10l-21.61-27H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,136H40V56H216V176ZM104,120v24a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0Zm32-16v40a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm32-16v56a8,8,0,0,1-16,0V88a8,8,0,0,1,16,0Z" />
                  </svg>
                </div>
                <p className="text-[#0e131b] text-sm font-medium leading-normal">
                  Insights
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3 px-3 py-2">
              <div
                className="text-[#0e131b]"
                data-icon="Gear"
                data-size="24px"
                data-weight="regular"
              >
                <svg
                  fill="currentColor"
                  height="24px"
                  viewBox="0 0 256 256"
                  width="24px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z" />
                </svg>
              </div>
              <p className="text-[#0e131b] text-sm font-medium leading-normal">
                Settings
              </p>
            </div>
          </div>
        </div>
      </div> */
}
