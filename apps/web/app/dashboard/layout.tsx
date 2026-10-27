import { GalleryVerticalEndIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarRail,
	SidebarTrigger,
} from "@/components/ui/sidebar";

const data = {
	navMain: [
		{
			title: "Getting Started",
			url: "#",
			items: [
				{
					title: "Installation",
					url: "#",
				},
				{
					title: "Project Structure",
					url: "#",
				},
			],
		},
		{
			title: "Build Your Application",
			url: "#",
			items: [
				{
					title: "Routing",
					url: "#",
				},
				{
					title: "Data Fetching",
					url: "#",
					isActive: true,
				},
				{
					title: "Rendering",
					url: "#",
				},
				{
					title: "Caching",
					url: "#",
				},
				{
					title: "Styling",
					url: "#",
				},
				{
					title: "Optimizing",
					url: "#",
				},
				{
					title: "Configuring",
					url: "#",
				},
				{
					title: "Testing",
					url: "#",
				},
				{
					title: "Authentication",
					url: "#",
				},
				{
					title: "Deploying",
					url: "#",
				},
				{
					title: "Upgrading",
					url: "#",
				},
				{
					title: "Examples",
					url: "#",
				},
			],
		},
		{
			title: "API Reference",
			url: "#",
			items: [
				{
					title: "Components",
					url: "#",
				},
				{
					title: "File Conventions",
					url: "#",
				},
				{
					title: "Functions",
					url: "#",
				},
				{
					title: "next.config.js Options",
					url: "#",
				},
				{
					title: "CLI",
					url: "#",
				},
				{
					title: "Edge Runtime",
					url: "#",
				},
			],
		},
		{
			title: "Architecture",
			url: "#",
			items: [
				{
					title: "Accessibility",
					url: "#",
				},
				{
					title: "Fast Refresh",
					url: "#",
				},
				{
					title: "Next.js Compiler",
					url: "#",
				},
				{
					title: "Supported Browsers",
					url: "#",
				},
				{
					title: "Turbopack",
					url: "#",
				},
			],
		},
		{
			title: "Community",
			url: "#",
			items: [
				{
					title: "Contribution Guide",
					url: "#",
				},
			],
		},
	],
};

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<SidebarProvider>
			<Sidebar>
				<SidebarHeader>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton size="lg" render={<Link href="#" />}>
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
									<GalleryVerticalEndIcon className="size-4" />
								</div>
								<div className="flex flex-col gap-0.5 leading-none">
									<span className="font-medium">Documentation</span>
									<span className="">v1.0.0</span>
								</div>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup>
						<SidebarMenu>
							{data.navMain.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										render={<a href={item.url} className="font-medium" />}
									>
										{item.title}
									</SidebarMenuButton>
									{item.items?.length ? (
										<SidebarMenuSub>
											{item.items.map((item) => (
												<SidebarMenuSubItem key={item.title}>
													<SidebarMenuSubButton
														isActive={item.isActive}
														render={<a href={item.url} />}
													>
														{item.title}
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									) : null}
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroup>
				</SidebarContent>
				<SidebarRail />
			</Sidebar>
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b">
					<div className="flex items-center gap-2 px-3">
						<SidebarTrigger />
						<Separator orientation="vertical" className="mr-2 h-4" />
					</div>
				</header>
				<main className="p-4">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);

	// return (
	//   <SidebarProvider>
	//     <Sidebar>
	//       <SidebarHeader>
	//         <SidebarMenu>
	//           <SidebarMenuItem>
	//             <SidebarMenuButton size="lg">
	//               <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
	//                 <GalleryVerticalEndIcon className="size-4" />
	//               </div>
	//               <div className="flex flex-col gap-0.5 leading-none">
	//                 <span className="font-medium">Documentation</span>
	//                 <span className="">v1.0.0</span>
	//               </div>
	//             </SidebarMenuButton>
	//           </SidebarMenuItem>
	//         </SidebarMenu>
	//       </SidebarHeader>
	//       <SidebarContent>
	//         <SidebarGroup>
	//           <SidebarMenu>
	//             {data.navMain.map((item) => (
	//               <SidebarMenuItem key={item.title}>
	//                 <SidebarMenuButton
	//                   render={<a href={item.url} className="font-medium" />}
	//                 >
	//                   {item.title}
	//                 </SidebarMenuButton>
	//                 {item.items?.length ? (
	//                   <SidebarMenuSub>
	//                     {item.items.map((item) => (
	//                       <SidebarMenuSubItem key={item.title}>
	//                         <SidebarMenuSubButton
	//                           isActive={item.isActive}
	//                           render={<a href={item.url} />}
	//                         >
	//                           {item.title}
	//                         </SidebarMenuSubButton>
	//                       </SidebarMenuSubItem>
	//                     ))}
	//                   </SidebarMenuSub>
	//                 ) : null}
	//               </SidebarMenuItem>
	//             ))}
	//           </SidebarMenu>
	//         </SidebarGroup>
	//       </SidebarContent>
	//     </Sidebar>
	//     {children}
	//   </SidebarProvider>
	// );
}
