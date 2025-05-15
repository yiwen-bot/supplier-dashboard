"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, File, X, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

// 文件类型和大小限制
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"]
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

// 格式化文件大小
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B"
  else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB"
  else return (bytes / (1024 * 1024)).toFixed(2) + " MB"
}

// 格式化金额
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    minimumFractionDigits: 2,
  }).format(amount)
}

// 状态颜色映射
const statusColorMap: Record<string, string> = {
  待结算: "bg-yellow-100 text-yellow-800",
  已结算: "bg-green-100 text-green-800",
  已支付: "bg-green-100 text-green-800",
  驳回: "bg-red-100 text-red-800",
}

// 模拟任务数据获取函数
function getTaskData(id: string) {
  // 在实际应用中，这里会从API获取数据
  return {
    id,
    name: id === "T-001" ? "产品质检审核" : "供应链优化方案",
    amount: id === "T-001" ? 5000 : 8000,
    status: id === "T-001" ? "待结算" : "已结算",
  }
}

export default function InvoiceUpload({ params }: { params: { id: string } }) {
  const router = useRouter()
  const taskData = getTaskData(params.id)

  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 处理文件上传
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (!selectedFiles || selectedFiles.length === 0) return

    const newFile = selectedFiles[0]

    // 验证文件类型
    if (!ACCEPTED_FILE_TYPES.includes(newFile.type)) {
      setError("只支持PDF、JPEG和PNG格式的文件")
      return
    }

    // 验证文件大小
    if (newFile.size > MAX_FILE_SIZE) {
      setError("文件大小不能超过5MB")
      return
    }

    setFiles([newFile])
    setError(null)

    // 清空文件输入框，允许重复选择相同文件
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // 处理拖放上传
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const droppedFiles = e.dataTransfer.files
    if (!droppedFiles || droppedFiles.length === 0) return

    const newFile = droppedFiles[0]

    // 验证文件类型
    if (!ACCEPTED_FILE_TYPES.includes(newFile.type)) {
      setError("只支持PDF、JPEG和PNG格式的文件")
      return
    }

    // 验证文件大小
    if (newFile.size > MAX_FILE_SIZE) {
      setError("文件大小不能超过5MB")
      return
    }

    setFiles([newFile])
    setError(null)
  }

  // 删除文件
  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  // 提交发票
  const handleSubmit = async () => {
    if (files.length === 0) {
      setError("请上传发票文件")
      return
    }

    setIsSubmitting(true)

    try {
      // 这里可以添加调用API提交发票的逻辑
      console.log(`提交发票: ${params.id}`, files)

      // 模拟API调用延迟
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 提交成功后显示状态
      setIsSubmitted(true)
      setIsSubmitting(false)
    } catch (error) {
      console.error("发票提交失败:", error)
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
        <Link href="/finance" className="text-[#0070f3] hover:underline">
          财务管理
        </Link>
        <span className="mx-1">&gt;</span>
        <span>发票上传</span>
      </div>

      {/* 任务信息区域 */}
      <Card className="mb-6 bg-white rounded-[5px] shadow-sm">
        <CardHeader>
          <CardTitle className="text-[16px] font-semibold text-[#333]">任务信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-[10px]">
          <div>
            <span className="text-[14px] text-[#666]">任务ID：</span>
            <span className="text-[14px] text-[#333]">{taskData.id}</span>
          </div>
          <div>
            <span className="text-[14px] text-[#666]">任务名称：</span>
            <span className="text-[14px] text-[#333]">{taskData.name}</span>
          </div>
          <div>
            <span className="text-[14px] text-[#666]">金额：</span>
            <span className="text-[14px] font-medium text-[#0070f3]">{formatCurrency(taskData.amount)}</span>
          </div>
          <div>
            <span className="text-[14px] text-[#666]">状态：</span>
            <Badge className={`font-normal ${statusColorMap[taskData.status]}`}>{taskData.status}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* 发票上传区域 */}
      <Card className="mb-6 bg-white rounded-[5px] shadow-sm">
        <CardHeader>
          <CardTitle className="text-[16px] font-semibold text-[#333]">上传发票</CardTitle>
        </CardHeader>
        <CardContent>
          {/* 错误提示 */}
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* 上传区域 */}
          <div
            className="h-[150px] border-2 border-dashed border-[#666] rounded-md flex flex-col items-center justify-center cursor-pointer mb-4"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={handleFileUpload}
            />
            <Upload className="h-8 w-8 text-[#666] mb-2" />
            <p className="text-[14px] text-[#333]">拖拽发票文件或点击上传</p>
            <p className="text-[12px] text-[#666] mt-1">支持PDF、JPEG、PNG格式，单文件不超过5MB</p>
          </div>

          {/* 已上传文件列表 */}
          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md h-[30px]">
                  <div className="flex items-center">
                    <File className="h-4 w-4 text-[#0070f3] mr-2" />
                    <span className="text-[14px] text-[#333] truncate max-w-[300px]">{file.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-[12px] text-[#666] mr-4">{formatFileSize(file.size)}</span>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                      aria-label="删除文件"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 状态提示区域 */}
      {isSubmitted && (
        <div className="mb-6">
          <div className="bg-[#28a745] text-white px-4 py-2 rounded-[5px] text-[14px]">发票已提交，等待审核</div>
        </div>
      )}

      {/* 底部按钮 */}
      <div className="flex gap-[10px]">
        {!isSubmitted ? (
          <Button className="bg-[#0070f3] hover:bg-[#0060d3] text-white" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "提交中..." : "提交发票"}
          </Button>
        ) : (
          <Button className="bg-[#0070f3] hover:bg-[#0060d3] text-white" onClick={() => router.push("/finance")}>
            返回财务管理
          </Button>
        )}
        {!isSubmitted && (
          <Button className="bg-[#666] hover:bg-[#555] text-white" asChild>
            <Link href="/finance">返回</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
