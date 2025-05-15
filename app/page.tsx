import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* 概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white shadow-sm hover:shadow transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-gray-700">待处理任务</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">5</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-gray-700">待参加测评</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">3</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-gray-700">待结算金额</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">￥5000</p>
          </CardContent>
        </Card>
      </div>

      {/* 快速入口 */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-800">快速入口</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Button
            className="h-auto py-6 bg-white text-blue-600 border border-gray-200 shadow-sm hover:bg-blue-50 hover:border-blue-200"
            asChild
          >
            <Link href="/tasks" className="flex flex-col items-center">
              <span>任务列表</span>
            </Link>
          </Button>

          <Button
            className="h-auto py-6 bg-white text-blue-600 border border-gray-200 shadow-sm hover:bg-blue-50 hover:border-blue-200"
            asChild
          >
            <Link href="/evaluations" className="flex flex-col items-center">
              <span>测评管理</span>
            </Link>
          </Button>

          <Button
            className="h-auto py-6 bg-white text-blue-600 border border-gray-200 shadow-sm hover:bg-blue-50 hover:border-blue-200"
            asChild
          >
            <Link href="/supplier" className="flex flex-col items-center">
              <span>供应商信息</span>
            </Link>
          </Button>

          <Button
            className="h-auto py-6 bg-white text-blue-600 border border-gray-200 shadow-sm hover:bg-blue-50 hover:border-blue-200"
            asChild
          >
            <Link href="/users" className="flex flex-col items-center">
              <span>用户管理</span>
            </Link>
          </Button>

          <Button
            className="h-auto py-6 bg-white text-blue-600 border border-gray-200 shadow-sm hover:bg-blue-50 hover:border-blue-200"
            asChild
          >
            <Link href="/finance" className="flex flex-col items-center">
              <span>财务管理</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* 最近任务 */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">最近任务</h2>
          <Link href="/tasks" className="text-sm text-blue-600 hover:underline">
            查看全部
          </Link>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-200">
            {[
              { id: "T-001", name: "产品质量评估", status: "待接受", deadline: "2023-12-15" },
              { id: "T-002", name: "供应链优化方案", status: "进行中", deadline: "2023-12-20" },
              { id: "T-003", name: "原材料成本分析", status: "已完成", deadline: "2023-12-10" },
            ].map((task) => (
              <div key={task.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">{task.name}</h3>
                    <p className="text-xs text-gray-500">截止日期: {task.deadline}</p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      task.status === "待接受"
                        ? "bg-yellow-100 text-yellow-800"
                        : task.status === "进行中"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
