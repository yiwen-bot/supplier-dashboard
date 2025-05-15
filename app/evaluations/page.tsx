"use client"

import { useState } from "react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

// 模拟测评数据
const evaluations = [
  { id: "E-001", name: "产品质量评估", deadline: "2023-12-15", status: "待参加" },
  { id: "E-002", name: "供应链效率评估", deadline: "2023-12-20", status: "待参加" },
  { id: "E-003", name: "成本控制评估", deadline: "2023-12-10", status: "已完成" },
  { id: "E-004", name: "服务质量评估", deadline: "2023-12-25", status: "待参加" },
  { id: "E-005", name: "技术能力评估", deadline: "2023-12-18", status: "已完成" },
]

// 模拟测评类型数据
const evaluationTypes = [
  { id: 1, name: "产品质检", passed: true },
  { id: 2, name: "服务质检", passed: true },
  { id: 3, name: "技术支持", passed: false },
  { id: 4, name: "供应链管理", passed: true },
  { id: 5, name: "成本控制", passed: false },
]

// 模拟用户数据
const users = [
  { id: "U-001", name: "张三", role: "管理员" },
  { id: "U-002", name: "李四", role: "普通用户" },
  { id: "U-003", name: "王五", role: "普通用户" },
  { id: "U-004", name: "赵六", role: "管理员" },
  { id: "U-005", name: "钱七", role: "普通用户" },
]

export default function EvaluationManagement() {
  const [status, setStatus] = useState<string>("all")
  const [isDistributeOpen, setIsDistributeOpen] = useState(false)
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const [selectedEvaluationId, setSelectedEvaluationId] = useState<string>("")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  // 根据状态筛选测评
  const filteredEvaluations =
    status === "all" ? evaluations : evaluations.filter((evaluation) => evaluation.status === status)

  // 处理分发操作
  const handleDistribute = (evaluationId: string) => {
    setSelectedEvaluationId(evaluationId)
    setSelectedUsers([])
    setIsDistributeOpen(true)
  }

  // 处理用户选择
  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  // 处理确认分发
  const handleConfirmDistribute = () => {
    console.log(`将测评 ${selectedEvaluationId} 分发给用户:`, selectedUsers)
    // 在实际应用中，这里会调用API来分发测评
    alert(`已将测评分发给 ${selectedUsers.length} 名用户`)
    setIsDistributeOpen(false)
  }

  // 处理申请更多测评
  const handleApplyMore = () => {
    setIsApplyModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-white p-5">
      {/* 面包屑导航 */}
      <div className="mb-6 text-[14px] text-[#333]">
        <Link href="/" className="text-[#0070f3] hover:underline">
          首页
        </Link>
        <span className="mx-1">&gt;</span>
        <span>测评管理</span>
      </div>

      {/* 概览区域 */}
      <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[16px] font-semibold text-[#333]">已通过测评类型概览</h2>
          <Button className="bg-[#0070f3] hover:bg-[#0060d3] text-white" onClick={handleApplyMore}>
            申请更多测评
          </Button>
        </div>
        <div className="flex flex-wrap gap-[10px]">
          {evaluationTypes.map((type) => (
            <Badge
              key={type.id}
              className={`text-white px-3 py-1 rounded-[5px] ${type.passed ? "bg-[#28a745]" : "bg-[#666]"}`}
            >
              {type.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* 筛选栏 */}
      <div className="mb-6">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[200px] text-[14px]">
            <SelectValue placeholder="测评状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="待参加">待参加</SelectItem>
            <SelectItem value="已完成">已完成</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 测评表格 */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-[14px] text-[#333]">测评ID</TableHead>
            <TableHead className="text-[14px] text-[#333]">名称</TableHead>
            <TableHead className="text-[14px] text-[#333]">截止日期</TableHead>
            <TableHead className="text-[14px] text-[#333]">状态</TableHead>
            <TableHead className="text-[14px] text-[#333]">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEvaluations.map((evaluation) => (
            <TableRow key={evaluation.id} className="h-[40px] hover:bg-gray-50">
              <TableCell className="text-[14px] text-[#333]">{evaluation.id}</TableCell>
              <TableCell className="text-[14px] text-[#333]">{evaluation.name}</TableCell>
              <TableCell className="text-[14px] text-[#333]">{evaluation.deadline}</TableCell>
              <TableCell className="text-[14px] text-[#333]">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    evaluation.status === "待参加" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                  }`}
                >
                  {evaluation.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-3">
                  <Link href={`/evaluations/${evaluation.id}`} className="text-[14px] text-[#0070f3] hover:underline">
                    查看
                  </Link>
                  {evaluation.status === "待参加" && (
                    <button
                      onClick={() => handleDistribute(evaluation.id)}
                      className="text-[14px] text-[#0070f3] hover:underline"
                    >
                      分发
                    </button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* 分发测评模态框 */}
      <Dialog open={isDistributeOpen} onOpenChange={setIsDistributeOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-[16px] font-semibold text-[#333]">选择参与测评的用户</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="max-h-[300px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px] text-[14px] text-[#333]">选择</TableHead>
                    <TableHead className="text-[14px] text-[#333]">用户ID</TableHead>
                    <TableHead className="text-[14px] text-[#333]">姓名</TableHead>
                    <TableHead className="text-[14px] text-[#333]">角色</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} className="h-[40px] hover:bg-gray-50">
                      <TableCell>
                        <Checkbox
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={() => toggleUserSelection(user.id)}
                        />
                      </TableCell>
                      <TableCell className="text-[14px] text-[#333]">{user.id}</TableCell>
                      <TableCell className="text-[14px] text-[#333]">{user.name}</TableCell>
                      <TableCell className="text-[14px] text-[#333]">{user.role}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <DialogFooter className="gap-[10px]">
            <Button
              variant="secondary"
              onClick={() => setIsDistributeOpen(false)}
              className="bg-[#666] text-white hover:bg-[#555]"
            >
              取消
            </Button>
            <Button
              className="bg-[#0070f3] hover:bg-[#0060d3] text-white"
              onClick={handleConfirmDistribute}
              disabled={selectedUsers.length === 0}
            >
              确认分发
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 申请更多测评模态框 */}
      <Dialog open={isApplyModalOpen} onOpenChange={setIsApplyModalOpen}>
        <DialogContent className="bg-white w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-[16px] font-semibold text-[#333]">申请更多测评</DialogTitle>
          </DialogHeader>
          <div className="py-4 h-[150px] flex items-center">
            <p className="text-[14px] text-[#333]">
              请联系您的供应商管理专员以申请更多测评类型，联系方式：
              <br />
              <br />
              邮箱：supplier@company.com
              <br />
              电话：123-456-7890
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setIsApplyModalOpen(false)}
              className="bg-[#666] text-white hover:bg-[#555]"
            >
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
