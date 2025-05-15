"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, File, X, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// 文件类型和大小限制
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/jpeg",
  "image/png",
]
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const MAX_FILES = 5

// 格式化文件大小
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B"
  else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB"
  else return (bytes / (1024 * 1024)).toFixed(2) + " MB"
}

// 模拟任务数据
const taskData = {
  taskId: "T-001",
  taskName: "产品质检审核",
  deadline: "2023-12-15",
}

export default function SubmitDeliverables({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 处理文件上传
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (!selectedFiles || selectedFiles.length === 0) return

    // 检查文件数量限制
    if (files.length + selectedFiles.length > MAX_FILES) {
      setError(`最多只能上传${MAX_FILES}个文件`)
      return
    }

    // 验证文件类型和大小
    const newFiles: File[] = []
    let hasError = false

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i]

      // 检查文件类型
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        setError("只支持PDF、Word、Excel、JPEG和PNG格式的文件")
        hasError = true
        break
      }

      // 检查文件大小
      if (file.size > MAX_FILE_SIZE) {
        setError("文件大小不能超过10MB")
        hasError = true
        break
      }

      newFiles.push(file)
    }

    if (!hasError) {
      setFiles((prevFiles) => [...prevFiles, ...newFiles])
      setError(null)
    }

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

    // 检查文件数量限制
    if (files.length + droppedFiles.length > MAX_FILES) {
      setError(`最多只能上传${MAX_FILES}个文件`)
      return
    }

    // 验证文件类型和大小
    const newFiles: File[] = []
    let hasError = false

    for (let i = 0; i < droppedFiles.length; i++) {
      const file = droppedFiles[i]

      // 检查文件类型
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        setError("只支持PDF、Word、Excel、JPEG和PNG格式的文件")
        hasError = true
        break
      }

      // 检查文件大小
      if (file.size > MAX_FILE_SIZE) {
        setError("文件大小不能超过10MB")
        hasError = true
        break
      }

      newFiles.push(file)
    }

    if (!hasError) {
      setFiles((prevFiles) => [...prevFiles, ...newFiles])
      setError(null)
    }
  }

  // 删除文件
  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
    setError(null)
  }

  // 提交成果
  const handleSubmit = async () => {
    if (files.length === 0) {
      setError("请至少上传一个文件")
      return
    }

    setIsSubmitting(true)

    try {
      // 这里可以添加调用API提交成果的逻辑
      console.log(`提交任务成果: ${params.id}`, files)

      // 模拟API调用延迟
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 提交成功后跳转到任务详情页
      alert("成果提交成功！")
      router.push(`/tasks/${params.id}?submitted=true`)
    } catch (error) {
      console.error("成果提交失败:", error)
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
        <span>成果提交</span>
      </div>

      {/* 任务信息区域 */}
      <Card className="mb-6 bg-white rounded-[5px] shadow-sm">
        <CardHeader>
          <CardTitle className="text-[16px] font-semibold text-[#333]">任务信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-[10px]">
          <div>
            <span className="text-[14px] text-[#666]">任务ID：</span>
            <span className="text-[14px] text-[#333]">{taskData.taskId}</span>
          </div>
          <div>
            <span className="text-[14px] text-[#666]">任务名称：</span>
            <span className="text-[14px] text-[#333]">{taskData.taskName}</span>
          </div>
          <div>
            <span className="text-[14px] text-[#666]">截止日期：</span>
            <span className="text-[14px] text-[#333]">{taskData.deadline}</span>
          </div>
        </CardContent>
      </Card>

      {/* 文件上传区域 */}
      <Card className="mb-6 bg-white rounded-[5px] shadow-sm">
        <CardHeader>
          <CardTitle className="text-[16px] font-semibold text-[#333]">上传成果</CardTitle>
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
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
              className="hidden"
              multiple
              onChange={handleFileUpload}
            />
            <Upload className="h-8 w-8 text-[#666] mb-2" />
            <p className="text-[14px] text-[#333]">拖拽文件或点击上传</p>
            <p className="text-[12px] text-[#666] mt-1">
              支持PDF、Word、Excel、JPEG、PNG格式，单文件不超过10MB，最多5个文件
            </p>
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

      {/* 底部按钮 */}
      <div className="flex gap-[10px]">
        <Button className="bg-[#0070f3] hover:bg-[#0060d3] text-white" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "提交中..." : "提交成果"}
        </Button>
        <Button className="bg-[#666] hover:bg-[#555] text-white" asChild>
          <Link href={`/tasks/${params.id}`}>返回</Link>
        </Button>
      </div>
    </div>
  )
}
