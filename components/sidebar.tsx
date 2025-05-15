"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ClipboardList, Award, Building2, Users, CreditCard, LogOut } from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const navigation = [
    { name: "首页", href: "/", icon: Home },
    { name: "任务管理", href: "/tasks", icon: ClipboardList },
    { name: "测评管理", href: "/evaluations", icon: Award },
    { name: "供应商信息", href: "/supplier", icon: Building2 },
    { name: "用户管理", href: "/users", icon: Users },
    { name: "财务管理", href: "/finance", icon: CreditCard },
  ]

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 bg-white border-r overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4 mb-5">
          <span className="text-xl font-semibold text-gray-800">供应商管理系统</span>
        </div>
        <div className="mt-5 flex-1 flex flex-col">
          <nav className="flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                    isActive(item.href)
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon
                    className={`mr-3 h-5 w-5 ${
                      isActive(item.href) ? "text-blue-600" : "text-gray-400 group-hover:text-gray-500"
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <button className="flex-shrink-0 w-full group block">
            <div className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
              <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
              退出登录
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
