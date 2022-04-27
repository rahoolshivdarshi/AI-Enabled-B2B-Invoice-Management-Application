package com.HighRadius.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

/**
 * Servlet implementation class updateAgingBucket
 */
@WebServlet("/updateAgingBucket")
public class updateAgingBucket extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public updateAgingBucket() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
		System.out.println(request);
		String doc_id = request.getParameter("doc_id");
		String aging_bucket = request.getParameter("aging_bucket");
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		
        
	        String url="jdbc:mysql://localhost:3306/grey_goose?zeroDateTimeBehavior=convertToNull";
			String uname="root";
			String pass="root";
			Connection conn = DriverManager.getConnection(url, uname, pass);
			String query = "UPDATE winter_internship SET aging_bucket = ? WHERE doc_id = ? ";
			PreparedStatement st = conn.prepareStatement(query);
			st.setString(1, aging_bucket);
			st.setString(2, doc_id);
			System.out.println(st);
			st.executeUpdate();
			
			
			//response.sendRedirect("Fetch");
			st.close();
			conn.close();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
