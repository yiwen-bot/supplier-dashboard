"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Sidebar from "./sidebar"

export default function Header() {
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // 根据路径获取页面标题
  const getPageTitle = () => {
    if (pathname === "/") return "首页"
    if (pathname.startsWith("/tasks")) return "任务管理"
    if (pathname.startsWith("/evaluations")) return "测评管理"
    if (pathname.startsWith("/supplier")) return "供应商信息"
    if (pathname.startsWith("/users")) return "用户管理"
    if (pathname.startsWith("/finance")) return "财务管理"
    return "供应商管理系统"
  }

  return (
    <header className="bg-white border-b border-gray-200 z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">打开菜单</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <Sidebar />
              </SheetContent>
            </Sheet>
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-semibold text-gray-800">{getPageTitle()}</h1>
            </div>
          </div>
          <div className="flex items-center">
            {isSearchOpen ? (
              <div className="w-full max-w-xs mr-4">
                <Input
                  type="search"
                  placeholder="搜索..."
                  className="h-9"
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                />
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">搜索</span>
              </Button>
            )}
            <Button variant="ghost" size="icon" className="ml-2">
              <Bell className="h-5 w-5" />
              <span className="sr-only">通知</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="ml-4 relative h-8 w-8 rounded-full">
                  <span className="sr-only">打开用户菜单</span>
                  <span className="relative inline-block h-8 w-8 overflow-hidden rounded-full bg-blue-100">
                    <span className="flex h-full w-full items-center justify-center text-sm font-medium text-blue-600">
                      张
                    </span>
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>张经理</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>个人资料</DropdownMenuItem>
                <DropdownMenuItem>设置</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>退出登录</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
