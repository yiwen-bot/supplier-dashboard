"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// 模拟验收单数据
const acceptanceData = {
  taskId: "T-001",
  taskName: "产品质检审核",
  requirements: "产品符合质量标准，提交完整报告",
  status: "待验收",
}

export default function AcceptanceConfirmation({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 处理确认验收
  const handleConfirmAcceptance = async () => {
    setIsSubmitting(true)

    try {
      // 这里可以添加调用API确认验收的逻辑
      console.log(`确认验收任务: ${params.id}`)

      // 模拟API调用延迟
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 验收成功后跳转到任务详情页
      router.push(`/tasks/${params.id}?confirmed=true`)
    } catch (error) {
      console.error("验收确认失败:", error)
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
        <Link href={`/tasks/${params.id}`} className="text-[#0070f3] hover:underline">
          任务详情
        </Link>
        <span className="mx-1">&gt;</span>
        <span>验收确认</span>
      </div>

      {/* 验收单信息区域 */}
      <Card className="mb-6 bg-white rounded-[5px] shadow-sm">
        <CardHeader>
          <CardTitle className="text-[16px] font-semibold text-[#333]">验收单信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-[10px]">
          <div>
            <span className="text-[14px] text-[#666]">任务ID：</span>
            <span className="text-[14px] text-[#333]">{acceptanceData.taskId}</span>
          </div>
          <div>
            <span className="text-[14px] text-[#666]">任务名称：</span>
            <span className="text-[14px] text-[#333]">{acceptanceData.taskName}</span>
          </div>
          <div>
            <span className="text-[14px] text-[#666]">验收要求：</span>
            <span className="text-[14px] text-[#333]">{acceptanceData.requirements}</span>
          </div>
          <div>
            <span className="text-[14px] text-[#666]">验收状态：</span>
            <span className="text-[14px] font-medium text-yellow-600">{acceptanceData.status}</span>
          </div>
        </CardContent>
      </Card>

      {/* 确认操作区域 */}
      <div className="mb-6">
        <div className="flex items-center mb-4 text-[14px] text-[#dc3545]">
          <AlertCircle className="h-4 w-4 mr-2" />
          <span>确认验收后将无法修改，是否继续？</span>
        </div>
        <div className="flex gap-[10px]">
          <Button
            className="bg-[#28a745] hover:bg-[#218838] text-white"
            onClick={() => setIsConfirmDialogOpen(true)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "处理中..." : "确认验收"}
          </Button>
          <Button className="bg-[#666] hover:bg-[#555] text-white" asChild>
            <Link href={`/tasks/${params.id}`}>返回</Link>
          </Button>
        </div>
      </div>

      {/* 确认对话框 */}
      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认验收</AlertDialogTitle>
            <AlertDialogDescription>您确定要验收此任务吗？验收后将无法修改。</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#666] text-white hover:bg-[#555]">取消</AlertDialogCancel>
            <AlertDialogAction
              className="bg-[#28a745] hover:bg-[#218838]"
              onClick={handleConfirmAcceptance}
              disabled={isSubmitting}
            >
              {isSubmitting ? "处理中..." : "确认"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
