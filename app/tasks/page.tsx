"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// 计算剩余天数
const calculateRemainingDays = (deadline: string): number => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const deadlineDate = new Date(deadline)
  deadlineDate.setHours(0, 0, 0, 0)
  const diffTime = deadlineDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

// 模拟任务数据
const tasks = [
  { id: "T-001", name: "产品质检审核", status: "进行中", deadline: "2023-12-15" },
  { id: "T-002", name: "供应链优化方案", status: "待接受", deadline: "2023-12-20" },
  { id: "T-003", name: "原材料成本分析", status: "已完成", deadline: "2023-12-10" },
  { id: "T-004", name: "生产流程改进", status: "待验收", deadline: "2023-12-25" },
  { id: "T-005", name: "质量控制体系审核", status: "已验收", deadline: "2023-12-18" },
]

// 状态颜色映射
const statusColorMap: Record<string, string> = {
  待接受: "bg-yellow-100 text-yellow-800",
  进行中: "bg-blue-100 text-blue-800",
  待验收: "bg-purple-100 text-purple-800",
  已验收: "bg-green-100 text-green-800",
  已完成: "bg-gray-100 text-gray-800",
}

export default function TaskManagement() {
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortOrder, setSortOrder] = useState<string>("asc")

  // 根据状态筛选任务
  const filteredTasks = useMemo(() => {
    return statusFilter === "all" ? tasks : tasks.filter((task) => task.status === statusFilter)
  }, [statusFilter])

  // 根据截止日期排序
  const sortedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      const dateA = new Date(a.deadline).getTime()
      const dateB = new Date(b.deadline).getTime()
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA
    })
  }, [filteredTasks, sortOrder])

  // 获取需要提醒的任务
  const reminderTasks = useMemo(() => {
    return tasks.filter((task) => {
      const remainingDays = calculateRemainingDays(task.deadline)
      return (task.status === "进行中" && remainingDays <= 2) || task.status === "待验收" || task.status === "已验收"
    })
  }, [])

  // 获取任务提醒信息
  const getReminderInfo = (task: (typeof tasks)[0]) => {
    const remainingDays = calculateRemainingDays(task.deadline)

    if (task.status === "进行中" && remainingDays <= 2) {
      return {
        message: `截止日期：${task.deadline}，剩余 ${remainingDays} 天`,
        alert: "快超期，请尽快提交交付成果",
        alertColor: "bg-[#ff9800]",
        action: "提交成果",
        actionColor: "bg-[#0070f3] hover:bg-[#0060d3]",
        actionLink: `/tasks/${task.id}/submit`,
      }
    } else if (task.status === "待验收") {
      return {
        message: `截止日期：${task.deadline}`,
        alert: "任务待验收，请确认验收",
        alertColor: "bg-[#ffc107]",
        action: "确认验收",
        actionColor: "bg-[#28a745] hover:bg-[#218838]",
        actionLink: `/tasks/${task.id}/confirm`,
      }
    } else if (task.status === "已验收") {
      return {
        message: `截止日期：${task.deadline}`,
        alert: "任务已验收，请申请付款",
        alertColor: "bg-[#28a745]",
        action: "申请付款",
        actionColor: "bg-[#0070f3] hover:bg-[#0060d3]",
        actionLink: `/tasks/${task.id}/payment`,
      }
    }

    return null
  }

  return (
    <div className="min-h-screen bg-white p-5">
      {/* 面包屑导航 */}
      <div className="mb-6 text-[14px] text-[#333]">
        <Link href="/" className="text-[#0070f3] hover:underline">
          首页
        </Link>
        <span className="mx-1">&gt;</span>
        <span>任务管理</span>
      </div>

      {/* 筛选栏 */}
      <div className="mb-6 flex flex-wrap gap-[10px]">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[200px] text-[14px]">
            <SelectValue placeholder="任务状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="待接受">待接受</SelectItem>
            <SelectItem value="进行中">进行中</SelectItem>
            <SelectItem value="待验收">待验收</SelectItem>
            <SelectItem value="已验收">已验收</SelectItem>
            <SelectItem value="已完成">已完成</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="w-[200px] text-[14px]">
            <SelectValue placeholder="截止日期排序" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">截止日期升序</SelectItem>
            <SelectItem value="desc">截止日期降序</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 进度提醒区域 */}
      {reminderTasks.length > 0 && (
        <div className="mb-6">
          <h2 className="text-[16px] font-semibold text-[#333] mb-4">任务进度提醒</h2>
          <div className="space-y-[10px]">
            {reminderTasks.map((task) => {
              const reminderInfo = getReminderInfo(task)
              if (!reminderInfo) return null

              return (
                <Card key={task.id} className="bg-white rounded-[5px] shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="text-[14px] font-medium text-[#333]">
                          任务ID: {task.id} {task.name}
                        </div>
                        <div className="text-[14px] text-[#666]">{reminderInfo.message}</div>
                        <div
                          className={`${reminderInfo.alertColor} text-white px-3 py-1 rounded-[5px] inline-block text-[14px]`}
                        >
                          {reminderInfo.alert}
                        </div>
                      </div>
                      <Button className={`${reminderInfo.actionColor} text-white`} asChild>
                        <Link href={reminderInfo.actionLink}>{reminderInfo.action}</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* 任务表格 */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-[14px] text-[#333]">任务ID</TableHead>
            <TableHead className="text-[14px] text-[#333]">名称</TableHead>
            <TableHead className="text-[14px] text-[#333]">状态</TableHead>
            <TableHead className="text-[14px] text-[#333]">截止日期</TableHead>
            <TableHead className="text-[14px] text-[#333]">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTasks.map((task) => (
            <TableRow key={task.id} className="h-[40px] hover:bg-gray-50">
              <TableCell className="text-[14px] text-[#333]">{task.id}</TableCell>
              <TableCell className="text-[14px] text-[#333]">{task.name}</TableCell>
              <TableCell className="text-[14px] text-[#333]">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    statusColorMap[task.status]
                  }`}
                >
                  {task.status}
                </span>
              </TableCell>
              <TableCell className="text-[14px] text-[#333]">{task.deadline}</TableCell>
              <TableCell>
                <div className="flex gap-3">
                  <Link href={`/tasks/${task.id}`} className="text-[14px] text-[#0070f3] hover:underline">
                    查看
                  </Link>

                  {task.status === "进行中" && (
                    <Link href={`/tasks/${task.id}/submit`} className="text-[14px] text-[#0070f3] hover:underline">
                      提交成果
                    </Link>
                  )}

                  {task.status === "待验收" && (
                    <Link href={`/tasks/${task.id}/confirm`} className="text-[14px] text-[#0070f3] hover:underline">
                      确认验收
                    </Link>
                  )}

                  {task.status === "已验收" && (
                    <Link href={`/tasks/${task.id}/payment`} className="text-[14px] text-[#0070f3] hover:underline">
                      申请付款
                    </Link>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
