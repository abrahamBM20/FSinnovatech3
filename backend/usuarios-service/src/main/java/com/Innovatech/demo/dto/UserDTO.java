package com.Innovatech.demo.dto;

public record UserDTO(
	Long id,
	String username,
	String role,
	boolean canManageUsers,
	boolean canViewAllProjects) {}

