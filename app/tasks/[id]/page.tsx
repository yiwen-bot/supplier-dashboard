"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// 模拟任务详情数据
const taskDetail = {
  id: "T-001",
  name: "产品质检审核",
  status: "待接受",
  deadline: "2023-12-15",
  description:
    "对新产品线进行质量审核，确保产品符合质量标准。需要检查产品的材料、工艺和成品质量，并提供详细的质量评估报告。",
}

export default function TaskDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [rejectReason, setRejectReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 处理接受任务
  const handleAcceptTask = async () => {
    setIsSubmitting(true)

    try {
      // 这里可以添加调用API接受任务的逻辑
      console.log(`接受任务: ${params.id}`)

      // 模拟API调用延迟
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 接受成功后关闭对话框并刷新页面
      setIsAcceptDialogOpen(false)
      setIsSubmitting(false)

      // 在实际应用中，这里应该重新获取任务数据或刷新页面
      alert("任务已接受！")
      router.refresh()
    } catch (error) {
      console.error("接受任务失败:", error)
      setIsSubmitting(false)
    }
  }

  // 处理拒绝任务
  const handleRejectTask = async () => {
    if (!rejectReason.trim()) {
      alert("请输入拒绝原因")
      return
    }

    setIsSubmitting(true)

    try {
      // 这里可以添加调用API拒绝任务的逻辑
      console.log(`拒绝任务: ${params.id}，原因: ${rejectReason}`)

      // 模拟API调用延迟
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 拒绝成功后关闭对话框并刷新页面
      setIsRejectDialogOpen(false)
      setIsSubmitting(false)
      setRejectReason("")

      // 在实际应用中，这里应该重新获取任务数据或刷新页面
      alert("任务已拒绝！")
      router.refresh()
    } catch (error) {
      console.error("拒绝任务失败:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white p-5">
      {/* 面包屑导航 */}
      <div className="mb-6 text-[14px] text-[#333]">
        <Link href="/" className="text-[#0070f3] hover:underline">
          首页
        </Link>
        <span className="mx-1">&gt;</span>
        <Link href="/tasks" className="text-[#0070f3] hover:underline">
          任务管理
        </Link>
        <span className="mx-1">&gt;</span>
        <span>任务详情</span>
      </div>

      {/* 任务信息区域 */}
      <Card className="mb-6 bg-white rounded-[5px] shadow-sm">
        <CardHeader>
          <CardTitle className="text-[16px] font-semibold text-[#333]">任务信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-[10px]">
          <div>
            <span className="text-[14px] text-[#666]">任务ID：</span>
            <span className="text-[14px] text-[#333]">{taskDetail.id}</span>
          </div>
          <div>
            <span className="text-[14px] text-[#666]">任务名称：</span>
            <span className="text-[14px] text-[#333]">{taskDetail.name}</span>
          </div>
          <div>
            <span className="text-[14px] text-[#666]">截止日期：</span>
            <span className="text-[14px] text-[#333]">{taskDetail.deadline}</span>
          </div>
          <div>
            <span className="text-[14px] text-[#666]">状态：</span>
            <span className="text-[14px] font-medium text-yellow-600">{taskDetail.status}</span>
          </div>
          <div>
            <span className="text-[14px] text-[#666]">任务描述：</span>
            <p className="text-[14px] text-[#333] mt-1">{taskDetail.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* 操作按钮区域 */}
      <div className="flex flex-wrap gap-[10px]">
        {taskDetail.status === "待接受" && (
          <>
            <Button className="bg-[#28a745] hover:bg-[#218838] text-white" onClick={() => setIsAcceptDialogOpen(true)}>
              接受任务
            </Button>
            <Button className="bg-[#dc3545] hover:bg-[#c82333] text-white" onClick={() => setIsRejectDialogOpen(true)}>
              拒绝任务
            </Button>
          </>
        )}

        <Button className="bg-[#0070f3] hover:bg-[#0060d3] text-white" asChild>
          <Link href={`/tasks/${params.id}/submit`}>成果提交</Link>
        </Button>

        <Button className="bg-[#0070f3] hover:bg-[#0060d3] text-white">质检反馈</Button>

        <Button className="bg-[#0070f3] hover:bg-[#0060d3] text-white" asChild>
          <Link href={`/tasks/${params.id}/confirm`}>验收确认</Link>
        </Button>
      </div>

      {/* 接受任务对话框 */}
      <Dialog open={isAcceptDialogOpen} onOpenChange={setIsAcceptDialogOpen}>
        <DialogContent className="bg-white w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-[16px] font-semibold text-[#333]">确认接受任务</DialogTitle>
            <DialogDescription className="text-[14px] text-[#333]">
              您确定要接受此任务吗？接受后将进入进行中状态。
            </DialogDescription>
          </DialogHeader>
          <div className="h-[150px] flex items-center justify-center">
            <p className="text-[14px] text-[#333]">
              接受任务后，您需要在截止日期前完成任务并提交成果。
              <br />
              <br />
              任务截止日期：{taskDetail.deadline}
            </p>
          </div>
          <DialogFooter className="gap-[10px]">
            <Button
              variant="secondary"
              onClick={() => setIsAcceptDialogOpen(false)}
              className="bg-[#666] text-white hover:bg-[#555]"
              disabled={isSubmitting}
            >
              取消
            </Button>
            <Button
              className="bg-[#28a745] hover:bg-[#218838] text-white"
              onClick={handleAcceptTask}
              disabled={isSubmitting}
            >
              {isSubmitting ? "处理中..." : "确认"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 拒绝任务对话框 */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="bg-white w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-[16px] font-semibold text-[#333]">拒绝任务</DialogTitle>
          </DialogHeader>
          <div className="h-[200px] py-4">
            <Label htmlFor="rejectReason" className="text-[14px] text-[#333] mb-2 block">
              请输入拒绝原因：
            </Label>
            <Textarea
              id="rejectReason"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="请详细说明拒绝原因..."
              className="w-[300px] h-[80px] text-[14px]"
            />
          </div>
          <DialogFooter className="gap-[10px]">
            <Button
              variant="secondary"
              onClick={() => setIsRejectDialogOpen(false)}
              className="bg-[#666] text-white hover:bg-[#555]"
              disabled={isSubmitting}
            >
              取消
            </Button>
            <Button
              className="bg-[#dc3545] hover:bg-[#c82333] text-white"
              onClick={handleRejectTask}
              disabled={isSubmitting}
            >
              {isSubmitting ? "处理中..." : "提交"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
