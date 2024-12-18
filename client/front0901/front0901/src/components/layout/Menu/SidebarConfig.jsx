import React from 'react'
import { PersonOutlined, HomeOutlined, AddToQueueOutlined, CableOutlined, AssignmentReturnOutlined } from '@mui/icons-material'

const sidebarConfig = [
	{
		title: 'inicio',
		path: '/app',
		icon: <HomeOutlined />
	},
	{
		title: 'usuarios',
		path: '/app/usuarios',
		icon: <PersonOutlined />
	},{
		title: 'préstamo',
		path: '/app/prestamo',
		icon: <AddToQueueOutlined />
	},{
		title: 'devolución',
		path: '/app/devoluciones',
		icon: <AssignmentReturnOutlined />
	},{
		title: 'material',
		path: '/app/material',
		icon: <CableOutlined />
	}
]

export default sidebarConfig