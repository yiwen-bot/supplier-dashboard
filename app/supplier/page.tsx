"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { Upload, File, X, Plus, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"

// 文件类型和大小限制
const VIDEO_FILE_TYPES = ["video/mp4"]
const VIDEO_MAX_SIZE = 50 * 1024 * 1024 // 50MB

const DOC_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]
const DOC_MAX_SIZE = 5 * 1024 * 1024 // 5MB

// 格式化文件大小
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B"
  else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB"
  else return (bytes / (1024 * 1024)).toFixed(2) + " MB"
}

// 项目经验类型
interface ProjectExperience {
  id: number
  name: string
  time: string
  description: string
  file: File | null
}

export default function SupplierInfo() {
  // 基础信息状态
  const [companyName, setCompanyName] = useState<string>("北京科技有限公司")
  const [creditCode, setCreditCode] = useState<string>("91110108MA01ABCDEF")
  const [contactPerson, setContactPerson] = useState<string>("张三")
  const [contactPhone, setContactPhone] = useState<string>("13800138000")
  const [contactAddress, setContactAddress] = useState<string>("北京市海淀区中关村南大街5号")
  const [employeeCount, setEmployeeCount] = useState<string>("50")
  const [companyVideo, setCompanyVideo] = useState<File | null>(null)

  // 项目经验状态
  const [projects, setProjects] = useState<ProjectExperience[]>([
    {
      id: 1,
      name: "智能制造系统开发",
      time: "2022-06-15",
      description: "为某大型制造企业开发智能生产管理系统",
      file: null,
    },
  ])

  // 补充材料状态
  const [leaseContract, setLeaseContract] = useState<File | null>(null)
  const [employeeRoster, setEmployeeRoster] = useState<File | null>(null)

  // 审核状态
  const [reviewStatus] = useState<string>("审核中")

  // 错误状态
  const [error, setError] = useState<string | null>(null)

  // 文件上传引用
  const videoInputRef = useRef<HTMLInputElement>(null)
  const projectFileRefs = useRef<(HTMLInputElement | null)[]>([])
  const leaseContractRef = useRef<HTMLInputElement>(null)
  const employeeRosterRef = useRef<HTMLInputElement>(null)

  // 处理视频上传
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    // 验证文件类型
    if (!VIDEO_FILE_TYPES.includes(selectedFile.type)) {
      setError("公司场地视频只支持MP4格式")
      return
    }

    // 验证文件大小
    if (selectedFile.size > VIDEO_MAX_SIZE) {
      setError("公司场地视频不能超过50MB")
      return
    }

    setCompanyVideo(selectedFile)
    setError(null)
  }

  // 处理文档上传
  const handleDocUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>,
    errorPrefix: string,
  ) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    // 验证文件类型
    if (!DOC_FILE_TYPES.includes(selectedFile.type)) {
      setError(`${errorPrefix}只支持PDF、JPEG、PNG或Excel格式`)
      return
    }

    // 验证文件大小
    if (selectedFile.size > DOC_MAX_SIZE) {
      setError(`${errorPrefix}不能超过5MB`)
      return
    }

    setter(selectedFile)
    setError(null)
  }

  // 处理项目文件上传
  const handleProjectFileUpload = (e: React.ChangeEvent<HTMLInputElement>, projectId: number) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    // 验证文件类型
    if (!DOC_FILE_TYPES.includes(selectedFile.type)) {
      setError("证明材料只支持PDF、JPEG或PNG格式")
      return
    }

    // 验证文件大小
    if (selectedFile.size > DOC_MAX_SIZE) {
      setError("证明材料不能超过5MB")
      return
    }

    setProjects((prevProjects) =>
      prevProjects.map((project) => (project.id === projectId ? { ...project, file: selectedFile } : project)),
    )
    setError(null)
  }

  // 处理拖放上传
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  // 处理视频拖放
  const handleVideoDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const droppedFile = e.dataTransfer.files?.[0]
    if (!droppedFile) return

    // 验证文件类型
    if (!VIDEO_FILE_TYPES.includes(droppedFile.type)) {
      setError("公司场地视频只支持MP4格式")
      return
    }

    // 验证文件大小
    if (droppedFile.size > VIDEO_MAX_SIZE) {
      setError("公司场地视频不能超过50MB")
      return
    }

    setCompanyVideo(droppedFile)
    setError(null)
  }

  // 处理文档拖放
  const handleDocDrop = (
    e: React.DragEvent,
    setter: React.Dispatch<React.SetStateAction<File | null>>,
    errorPrefix: string,
  ) => {
    e.preventDefault()
    e.stopPropagation()

    const droppedFile = e.dataTransfer.files?.[0]
    if (!droppedFile) return

    // 验证文件类型
    if (!DOC_FILE_TYPES.includes(droppedFile.type)) {
      setError(`${errorPrefix}只支持PDF、JPEG、PNG或Excel格式`)
      return
    }

    // 验证文件大小
    if (droppedFile.size > DOC_MAX_SIZE) {
      setError(`${errorPrefix}不能超过5MB`)
      return
    }

    setter(droppedFile)
    setError(null)
  }

  // 处理项目文件拖放
  const handleProjectFileDrop = (e: React.DragEvent, projectId: number) => {
    e.preventDefault()
    e.stopPropagation()

    const droppedFile = e.dataTransfer.files?.[0]
    if (!droppedFile) return

    // 验证文件类型
    if (!DOC_FILE_TYPES.includes(droppedFile.type)) {
      setError("证明材料只支持PDF、JPEG或PNG格式")
      return
    }

    // 验证文件大小
    if (droppedFile.size > DOC_MAX_SIZE) {
      setError("证明材料不能超过5MB")
      return
    }

    setProjects((prevProjects) =>
      prevProjects.map((project) => (project.id === projectId ? { ...project, file: droppedFile } : project)),
    )
    setError(null)
  }

  // 删除文件
  const removeFile = (
    setter: React.Dispatch<React.SetStateAction<File | null>>,
    inputRef: React.RefObject<HTMLInputElement>,
  ) => {
    setter(null)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  // 删除项目文件
  const removeProjectFile = (projectId: number) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => (project.id === projectId ? { ...project, file: null } : project)),
    )
    const inputRef = projectFileRefs.current[projectId - 1]
    if (inputRef) {
      inputRef.value = ""
    }
  }

  // 添加项目经验
  const addProject = () => {
    const newId = projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1
    setProjects([...projects, { id: newId, name: "", time: "", description: "", file: null }])
  }

  // 删除项目经验
  const removeProject = (id: number) => {
    setProjects(projects.filter((project) => project.id !== id))
  }

  // 更新项目信息
  const updateProject = (id: number, field: keyof ProjectExperience, value: string) => {
    setProjects(projects.map((project) => (project.id === id ? { ...project, [field]: value } : project)))
  }

  // 保存表单
  const handleSave = () => {
    // 这里可以添加表单验证和提交到服务器的逻辑
    console.log("保存供应商信息:", {
      companyName,
      creditCode,
      contactPerson,
      contactPhone,
      contactAddress,
      employeeCount,
      companyVideo,
      projects,
      leaseContract,
      employeeRoster,
    })
    alert("供应商信息保存成功！")
  }

  return (
    <div className="min-h-screen bg-white p-5">
      {/* 面包屑导航 */}
      <div className="mb-6 text-[14px] text-[#333]">
        <Link href="/" className="text-[#0070f3] hover:underline">
          首页
        </Link>
        <span className="mx-1">&gt;</span>
        <span>供应商信息</span>
      </div>

      {/* 错误提示 */}
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* 审核状态 */}
      <div className="mb-2 flex items-center">
        <span className="text-[14px] text-[#333] mr-2">审核状态:</span>
        <span
          className={`text-[14px] font-medium ${
            reviewStatus === "通过"
              ? "text-[#28a745]"
              : reviewStatus === "不通过"
                ? "text-[#dc3545]"
                : reviewStatus === "审核中"
                  ? "text-[#0070f3]"
                  : "text-[#ffc107]"
          }`}
        >
          {reviewStatus}
        </span>
      </div>

      {/* 审核状态提示信息 */}
      <div className="mb-6">
        {reviewStatus === "审核中" && <div className="text-[14px] text-[#ffc107]">审核中，请耐心等待</div>}
        {reviewStatus === "通过" && <div className="text-[14px] text-[#28a745]">审核通过</div>}
        {reviewStatus === "不通过" && (
          <div className="text-[14px] text-[#dc3545]">审核未通过，请查看反馈并修改信息</div>
        )}
        {reviewStatus === "待审核" && <div className="text-[14px] text-[#ffc107]">待审核，请确保信息完整准确</div>}
      </div>

      {/* 基础信息区域 */}
      <div className="mb-6">
        <h2 className="text-[16px] font-semibold text-[#333] mb-4">基础信息</h2>
        <div className="space-y-[10px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
            <div>
              <Label htmlFor="companyName" className="text-[14px] text-[#333] mb-1 block">
                公司名称
              </Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-[300px] text-[14px]"
              />
            </div>
            <div>
              <Label htmlFor="creditCode" className="text-[14px] text-[#333] mb-1 block">
                统一社会信用代码
              </Label>
              <Input
                id="creditCode"
                value={creditCode}
                onChange={(e) => setCreditCode(e.target.value)}
                className="w-[300px] text-[14px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
            <div>
              <Label htmlFor="contactPerson" className="text-[14px] text-[#333] mb-1 block">
                联系人
              </Label>
              <Input
                id="contactPerson"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="w-[300px] text-[14px]"
              />
            </div>
            <div>
              <Label htmlFor="contactPhone" className="text-[14px] text-[#333] mb-1 block">
                联系电话
              </Label>
              <Input
                id="contactPhone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-[300px] text-[14px]"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="contactAddress" className="text-[14px] text-[#333] mb-1 block">
              联系地址
            </Label>
            <Input
              id="contactAddress"
              value={contactAddress}
              onChange={(e) => setContactAddress(e.target.value)}
              className="w-[300px] text-[14px]"
            />
          </div>

          <div>
            <Label htmlFor="employeeCount" className="text-[14px] text-[#333] mb-1 block">
              员工数量
            </Label>
            <Input
              id="employeeCount"
              type="number"
              value={employeeCount}
              onChange={(e) => setEmployeeCount(e.target.value)}
              className="w-[300px] text-[14px]"
            />
          </div>

          <div>
            <Label className="text-[14px] text-[#333] mb-1 block">公司场地视频</Label>
            <div
              className="h-[100px] border-2 border-dashed border-[#666] rounded-md flex flex-col items-center justify-center cursor-pointer"
              onDragOver={handleDragOver}
              onDrop={handleVideoDrop}
              onClick={() => videoInputRef.current?.click()}
            >
              <input ref={videoInputRef} type="file" accept=".mp4" className="hidden" onChange={handleVideoUpload} />
              <Upload className="h-6 w-6 text-[#666] mb-2" />
              <p className="text-[14px] text-[#333]">上传公司场地视频</p>
              <p className="text-[12px] text-[#666] mt-1">支持MP4格式，单文件不超过50MB</p>
            </div>
            {companyVideo && (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md mt-2">
                <div className="flex items-center">
                  <File className="h-5 w-5 text-[#0070f3] mr-2" />
                  <span className="text-[14px] text-[#333]">{companyVideo.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-[12px] text-[#666] mr-4">{formatFileSize(companyVideo.size)}</span>
                  <button
                    onClick={() => removeFile(setCompanyVideo, videoInputRef)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="删除文件"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {/* 历史项目经验区域 */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[16px] font-semibold text-[#333]">历史项目经验</h2>
          <Button className="bg-[#0070f3] hover:bg-[#0060d3] text-white" onClick={addProject}>
            <Plus className="mr-2 h-4 w-4" />
            添加项目经验
          </Button>
        </div>

        <div className="space-y-[10px]">
          {projects.map((project, index) => (
            <div key={project.id} className="border border-gray-200 rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-[14px] font-medium text-[#333]">项目 #{project.id}</h3>
                {projects.length > 1 && (
                  <button
                    onClick={() => removeProject(project.id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="删除项目"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px] mb-[10px]">
                <div>
                  <Label htmlFor={`projectName-${project.id}`} className="text-[14px] text-[#333] mb-1 block">
                    项目名称
                  </Label>
                  <Input
                    id={`projectName-${project.id}`}
                    value={project.name}
                    onChange={(e) => updateProject(project.id, "name", e.target.value)}
                    className="w-[300px] text-[14px]"
                  />
                </div>
                <div>
                  <Label htmlFor={`projectTime-${project.id}`} className="text-[14px] text-[#333] mb-1 block">
                    项目时间
                  </Label>
                  <div className="relative w-[300px]">
                    <Input
                      id={`projectTime-${project.id}`}
                      type="date"
                      value={project.time}
                      onChange={(e) => updateProject(project.id, "time", e.target.value)}
                      className="w-full text-[14px]"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="mb-[10px]">
                <Label htmlFor={`projectDesc-${project.id}`} className="text-[14px] text-[#333] mb-1 block">
                  项目描述
                </Label>
                <Textarea
                  id={`projectDesc-${project.id}`}
                  value={project.description}
                  onChange={(e) => updateProject(project.id, "description", e.target.value)}
                  className="w-[300px] h-[80px] text-[14px]"
                />
              </div>

              <div>
                <Label className="text-[14px] text-[#333] mb-1 block">证明材料</Label>
                <div
                  className="h-[100px] border-2 border-dashed border-[#666] rounded-md flex flex-col items-center justify-center cursor-pointer"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleProjectFileDrop(e, project.id)}
                  onClick={() => projectFileRefs.current[index]?.click()}
                >
                  <input
                    ref={(el) => (projectFileRefs.current[index] = el)}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => handleProjectFileUpload(e, project.id)}
                  />
                  <Upload className="h-6 w-6 text-[#666] mb-2" />
                  <p className="text-[14px] text-[#333]">上传证明材料</p>
                  <p className="text-[12px] text-[#666] mt-1">支持PDF、JPEG、PNG格式，单文件不超过5MB</p>
                </div>
                {project.file && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md mt-2">
                    <div className="flex items-center">
                      <File className="h-5 w-5 text-[#0070f3] mr-2" />
                      <span className="text-[14px] text-[#333]">{project.file.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[12px] text-[#666] mr-4">{formatFileSize(project.file.size)}</span>
                      <button
                        onClick={() => removeProjectFile(project.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="删除文件"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-6" />

      {/* 补充材料区域 */}
      <div className="mb-6">
        <h2 className="text-[16px] font-semibold text-[#333] mb-4">补充材料</h2>
        <div className="space-y-[10px]">
          <div>
            <Label className="text-[14px] text-[#333] mb-1 block">办公租赁合同</Label>
            <div
              className="h-[100px] border-2 border-dashed border-[#666] rounded-md flex flex-col items-center justify-center cursor-pointer"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDocDrop(e, setLeaseContract, "办公租赁合同")}
              onClick={() => leaseContractRef.current?.click()}
            >
              <input
                ref={leaseContractRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => handleDocUpload(e, setLeaseContract, "办公租赁合同")}
              />
              <Upload className="h-6 w-6 text-[#666] mb-2" />
              <p className="text-[14px] text-[#333]">上传办公租赁合同</p>
              <p className="text-[12px] text-[#666] mt-1">支持PDF格式，单文件不超过5MB</p>
            </div>
            {leaseContract && (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md mt-2">
                <div className="flex items-center">
                  <File className="h-5 w-5 text-[#0070f3] mr-2" />
                  <span className="text-[14px] text-[#333]">{leaseContract.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-[12px] text-[#666] mr-4">{formatFileSize(leaseContract.size)}</span>
                  <button
                    onClick={() => removeFile(setLeaseContract, leaseContractRef)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="删除文件"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div>
            <Label className="text-[14px] text-[#333] mb-1 block">员工花名册</Label>
            <div
              className="h-[100px] border-2 border-dashed border-[#666] rounded-md flex flex-col items-center justify-center cursor-pointer"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDocDrop(e, setEmployeeRoster, "员工花名册")}
              onClick={() => employeeRosterRef.current?.click()}
            >
              <input
                ref={employeeRosterRef}
                type="file"
                accept=".pdf,.xls,.xlsx"
                className="hidden"
                onChange={(e) => handleDocUpload(e, setEmployeeRoster, "员工花名册")}
              />
              <Upload className="h-6 w-6 text-[#666] mb-2" />
              <p className="text-[14px] text-[#333]">上传员工花名册</p>
              <p className="text-[12px] text-[#666] mt-1">支持PDF、Excel格式，单文件不超过5MB</p>
            </div>
            {employeeRoster && (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md mt-2">
                <div className="flex items-center">
                  <File className="h-5 w-5 text-[#0070f3] mr-2" />
                  <span className="text-[14px] text-[#333]">{employeeRoster.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-[12px] text-[#666] mr-4">{formatFileSize(employeeRoster.size)}</span>
                  <button
                    onClick={() => removeFile(setEmployeeRoster, employeeRosterRef)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="删除文件"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 底部按钮 */}
      <div className="flex gap-[10px]">
        <Button className="bg-[#0070f3] hover:bg-[#0060d3] text-white" onClick={handleSave}>
          保存
        </Button>
        <Button className="bg-[#666] hover:bg-[#555] text-white" asChild>
          <Link href="/">返回</Link>
        </Button>
      </div>
    </div>
  )
}
