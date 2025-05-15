"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, X, Plus, Search, Edit } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// 模拟用户数据
const initialUsers = [
  {
    id: "U-001",
    name: "张三",
    role: "管理员",
    phone: "13800138000",
    joinTime: "2023-12-01",
    status: "启用",
    notes: "系统主管理员",
  },
  {
    id: "U-002",
    name: "李四",
    role: "普通用户",
    phone: "13800138001",
    joinTime: "2023-12-02",
    status: "禁用",
    notes: "负责产品质检",
  },
  {
    id: "U-003",
    name: "王五",
    role: "普通用户",
    phone: "13800138002",
    joinTime: "2023-12-03",
    status: "启用",
    notes: "负责供应链管理",
  },
  {
    id: "U-004",
    name: "赵六",
    role: "管理员",
    phone: "13800138003",
    joinTime: "2023-12-04",
    status: "启用",
    notes: "财务管理员",
  },
  {
    id: "U-005",
    name: "钱七",
    role: "普通用户",
    phone: "13800138004",
    joinTime: "2023-12-05",
    status: "启用",
    notes: "负责客户关系",
  },
  {
    id: "U-006",
    name: "孙八",
    role: "普通用户",
    phone: "13800138005",
    joinTime: "2023-12-06",
    status: "禁用",
    notes: "临时用户",
  },
  {
    id: "U-007",
    name: "周九",
    role: "普通用户",
    phone: "13800138006",
    joinTime: "2023-12-07",
    status: "启用",
    notes: "负责技术支持",
  },
  {
    id: "U-008",
    name: "吴十",
    role: "普通用户",
    phone: "13800138007",
    joinTime: "2023-12-08",
    status: "启用",
    notes: "负责市场营销",
  },
  {
    id: "U-009",
    name: "郑十一",
    role: "普通用户",
    phone: "13800138008",
    joinTime: "2023-12-09",
    status: "启用",
    notes: "负责产品开发",
  },
  {
    id: "U-010",
    name: "王十二",
    role: "普通用户",
    phone: "13800138009",
    joinTime: "2023-12-10",
    status: "禁用",
    notes: "实习生",
  },
]

export default function UserManagement() {
  // 状态管理
  const [users, setUsers] = useState(initialUsers)
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isEditUserOpen, setIsEditUserOpen] = useState(false)
  const [isStatusConfirmOpen, setIsStatusConfirmOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)

  // 新用户/编辑用户表单状态
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    role: "普通用户",
    phone: "",
    joinTime: "",
    status: "启用",
    notes: "",
  })

  // 状态确认对话框状态
  const [statusAction, setStatusAction] = useState<{ userId: string; newStatus: string }>({
    userId: "",
    newStatus: "",
  })

  // 筛选和搜索用户
  const filteredUsers = users.filter((user) => {
    const roleMatch = roleFilter === "all" || user.role === roleFilter
    const statusMatch = statusFilter === "all" || user.status === statusFilter
    const searchMatch =
      searchQuery === "" ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    return roleMatch && statusMatch && searchMatch
  })

  // 分页
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  // 处理添加用户
  const handleAddUser = () => {
    if (!formData.name || !formData.phone) {
      alert("姓名和联系电话为必填项")
      return
    }

    const newUser = {
      ...formData,
      id: `U-${String(users.length + 1).padStart(3, "0")}`,
      joinTime: new Date().toISOString().split("T")[0],
    }

    setUsers([...users, newUser])
    setIsAddUserOpen(false)
    resetForm()
  }

  // 处理编辑用户
  const handleEditUser = () => {
    if (!formData.name || !formData.phone) {
      alert("姓名和联系电话为必填项")
      return
    }

    setUsers(users.map((user) => (user.id === formData.id ? formData : user)))
    setIsEditUserOpen(false)
    resetForm()
  }

  // 打开编辑用户对话框
  const openEditDialog = (user: (typeof users)[0]) => {
    setFormData(user)
    setIsEditUserOpen(true)
  }

  // 打开状态确认对话框
  const openStatusConfirmDialog = (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "启用" ? "禁用" : "启用"
    setStatusAction({ userId, newStatus })
    setIsStatusConfirmOpen(true)
  }

  // 处理状态更改
  const handleStatusChange = () => {
    setUsers(
      users.map((user) => (user.id === statusAction.userId ? { ...user, status: statusAction.newStatus } : user)),
    )
    setIsStatusConfirmOpen(false)
  }

  // 重置表单
  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      role: "普通用户",
      phone: "",
      joinTime: "",
      status: "启用",
      notes: "",
    })
  }

  // 处理分页
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="min-h-screen bg-white p-5">
      {/* 面包屑导航 */}
      <div className="mb-6 text-[14px] text-[#333]">
        <Link href="/" className="text-[#0070f3] hover:underline">
          首页
        </Link>
        <span className="mx-1">&gt;</span>
        <span>用户管理</span>
      </div>

      {/* 筛选栏 */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-[10px]">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="全部分类" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部分类</SelectItem>
              <SelectItem value="管理员">管理员</SelectItem>
              <SelectItem value="普通用户">普通用户</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="角色状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部状态</SelectItem>
              <SelectItem value="启用">启用</SelectItem>
              <SelectItem value="禁用">禁用</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-[10px]">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="搜索用户ID或姓名"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[200px] pl-8"
            />
          </div>
          <Button className="bg-[#0070f3] hover:bg-[#0060d3] text-white" onClick={() => setIsAddUserOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            添加用户
          </Button>
        </div>
      </div>

      {/* 用户列表区域 */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-[14px] text-[#333]">用户ID</TableHead>
            <TableHead className="text-[14px] text-[#333]">姓名</TableHead>
            <TableHead className="text-[14px] text-[#333]">角色</TableHead>
            <TableHead className="text-[14px] text-[#333]">联系电话</TableHead>
            <TableHead className="text-[14px] text-[#333]">加入时间</TableHead>
            <TableHead className="text-[14px] text-[#333]">状态</TableHead>
            <TableHead className="text-[14px] text-[#333]">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((user) => (
            <TableRow key={user.id} className="h-[35px] hover:bg-gray-50">
              <TableCell className="text-[14px] text-[#333]">{user.id}</TableCell>
              <TableCell className="text-[14px] text-[#333]">{user.name}</TableCell>
              <TableCell className="text-[14px] text-[#333]">{user.role}</TableCell>
              <TableCell className="text-[14px] text-[#333]">{user.phone}</TableCell>
              <TableCell className="text-[14px] text-[#333]">{user.joinTime}</TableCell>
              <TableCell className="text-[14px] text-[#333]">
                <div className="flex items-center">
                  {user.status === "启用" ? (
                    <span className="flex items-center text-[#28a745]">
                      <Check className="mr-1 h-4 w-4" />
                      启用
                    </span>
                  ) : (
                    <span className="flex items-center text-[#666]">
                      <X className="mr-1 h-4 w-4" />
                      禁用
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => openEditDialog(user)}
                    className="text-[#0070f3] hover:text-[#0060d3]"
                    title="编辑用户"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">编辑</span>
                  </button>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={user.status === "启用"}
                      onCheckedChange={() => openStatusConfirmDialog(user.id, user.status)}
                      aria-label={`${user.status === "启用" ? "禁用" : "启用"}用户`}
                    />
                    <span className="text-[14px] text-[#333]">{user.status === "启用" ? "启用" : "禁用"}</span>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* 分页区域 */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-[14px] text-[#333]">
          共 {filteredUsers.length} 条记录，每页 {itemsPerPage} 条
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage > 1) paginate(currentPage - 1)
                }}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <PaginationItem key={number}>
                <PaginationLink
                  href="#"
                  isActive={number === currentPage}
                  onClick={(e) => {
                    e.preventDefault()
                    paginate(number)
                  }}
                >
                  {number}
                </PaginationLink>
              </PaginationItem>
            ))}
            {totalPages > 5 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage < totalPages) paginate(currentPage + 1)
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* 添加用户对话框 */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="bg-white w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-[16px] font-semibold text-[#333]">添加用户</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[14px] text-[#333]">
                  姓名 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-[300px] text-[14px]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[14px] text-[#333]">
                  联系电话 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-[300px] text-[14px]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="text-[14px] text-[#333]">
                  角色
                </Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger id="role" className="w-[300px] text-[14px]">
                    <SelectValue placeholder="选择角色" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="管理员">管理员</SelectItem>
                    <SelectItem value="普通用户">普通用户</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-[14px] text-[#333]">
                  备注
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-[300px] h-[80px] text-[14px]"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="gap-[10px]">
            <Button
              variant="secondary"
              onClick={() => {
                setIsAddUserOpen(false)
                resetForm()
              }}
              className="bg-[#666] text-white hover:bg-[#555]"
            >
              取消
            </Button>
            <Button className="bg-[#0070f3] hover:bg-[#0060d3] text-white" onClick={handleAddUser}>
              确认添加
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 编辑用户对话框 */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent className="bg-white w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-[16px] font-semibold text-[#333]">编辑用户</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name" className="text-[14px] text-[#333]">
                  姓名 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-[300px] text-[14px]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone" className="text-[14px] text-[#333]">
                  联系电话 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit-phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-[300px] text-[14px]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role" className="text-[14px] text-[#333]">
                  角色
                </Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger id="edit-role" className="w-[300px] text-[14px]">
                    <SelectValue placeholder="选择角色" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="管理员">管理员</SelectItem>
                    <SelectItem value="普通用户">普通用户</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-notes" className="text-[14px] text-[#333]">
                  备注
                </Label>
                <Textarea
                  id="edit-notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-[300px] h-[80px] text-[14px]"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="gap-[10px]">
            <Button
              variant="secondary"
              onClick={() => {
                setIsEditUserOpen(false)
                resetForm()
              }}
              className="bg-[#666] text-white hover:bg-[#555]"
            >
              取消
            </Button>
            <Button className="bg-[#0070f3] hover:bg-[#0060d3] text-white" onClick={handleEditUser}>
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 状态确认对话框 */}
      <Dialog open={isStatusConfirmOpen} onOpenChange={setIsStatusConfirmOpen}>
        <DialogContent className="bg-white w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-[16px] font-semibold text-[#333]">确认操作</DialogTitle>
            <DialogDescription className="text-[14px] text-[#333]">
              确定要{statusAction.newStatus === "启用" ? "启用" : "禁用"}该用户吗？
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-[10px]">
            <Button
              variant="secondary"
              onClick={() => setIsStatusConfirmOpen(false)}
              className="bg-[#666] text-white hover:bg-[#555]"
            >
              取消
            </Button>
            <Button
              className={`${
                statusAction.newStatus === "启用"
                  ? "bg-[#28a745] hover:bg-[#218838]"
                  : "bg-[#dc3545] hover:bg-[#c82333]"
              } text-white`}
              onClick={handleStatusChange}
            >
              确认
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
