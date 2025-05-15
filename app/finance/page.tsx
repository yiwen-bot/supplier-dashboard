"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// 格式化金额
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    minimumFractionDigits: 2,
  }).format(amount)
}

// 模拟财务数据
const financialData = {
  accountBalance: 25000,
  pendingSettlement: 15000,
  settledAmount: 120000,
}

// 模拟任务记录数据
const taskRecords = [
  { id: "T-001", name: "产品质检审核", amount: 5000, status: "待结算" },
  { id: "T-002", name: "供应链优化方案", amount: 8000, status: "已结算" },
  { id: "T-003", name: "原材料成本分析", amount: 12000, status: "已支付" },
  { id: "T-004", name: "生产流程改进", amount: 7000, status: "驳回" },
  { id: "T-005", name: "质量控制体系审核", amount: 15000, status: "待结算" },
]

// 状态颜色映射
const statusColorMap: Record<string, string> = {
  待结算: "bg-yellow-100 text-yellow-800",
  已结算: "bg-green-100 text-green-800",
  已支付: "bg-green-100 text-green-800",
  驳回: "bg-red-100 text-red-800",
}

export default function FinancialManagement() {
  return (
    <div className="min-h-screen bg-white p-5">
      {/* 面包屑导航 */}
      <div className="mb-6 text-[14px] text-[#333]">
        <Link href="/" className="text-[#0070f3] hover:underline">
          首页
        </Link>
        <span className="mx-1">&gt;</span>
        <span>财务管理</span>
      </div>

      {/* 财务概览区域 */}
      <div className="mb-8">
        <h2 className="text-[16px] font-semibold text-[#333] mb-4">财务概览</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px]">
          <Card className="bg-white rounded-[5px] shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-[14px] text-[#333]">账户余额</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[18px] font-bold text-[#0070f3]">{formatCurrency(financialData.accountBalance)}</p>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-[5px] shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-[14px] text-[#333]">待结算金额</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[18px] font-bold text-[#0070f3]">{formatCurrency(financialData.pendingSettlement)}</p>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-[5px] shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-[14px] text-[#333]">已结算金额</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[18px] font-bold text-[#0070f3]">{formatCurrency(financialData.settledAmount)}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 任务记录区域 */}
      <div>
        <h2 className="text-[16px] font-semibold text-[#333] mb-4">任务记录</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[14px] text-[#333]">任务ID</TableHead>
              <TableHead className="text-[14px] text-[#333]">任务名称</TableHead>
              <TableHead className="text-[14px] text-[#333]">金额</TableHead>
              <TableHead className="text-[14px] text-[#333]">状态</TableHead>
              <TableHead className="text-[14px] text-[#333]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {taskRecords.map((task) => (
              <TableRow key={task.id} className="h-[40px] hover:bg-gray-50">
                <TableCell className="text-[14px] text-[#333]">{task.id}</TableCell>
                <TableCell className="text-[14px] text-[#333]">{task.name}</TableCell>
                <TableCell className="text-[14px] text-[#333]">{formatCurrency(task.amount)}</TableCell>
                <TableCell className="text-[14px]">
                  <Badge className={`font-normal ${statusColorMap[task.status]}`}>{task.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link href={`/finance/detail/${task.id}`} className="text-[14px] text-[#0070f3] hover:underline">
                      查看
                    </Link>
                    {(task.status === "待结算" || task.status === "已结算") && (
                      <Link href={`/finance/invoice/${task.id}`} className="text-[14px] text-[#0070f3] hover:underline">
                        发票上传
                      </Link>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
