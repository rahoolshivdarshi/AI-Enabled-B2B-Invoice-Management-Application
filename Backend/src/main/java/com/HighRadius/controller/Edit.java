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
 * Servlet implementation class Edit
 */
@WebServlet("/Edit")
public class Edit extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Edit() {
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
		// TODO Auto-generated method stub
		
		
		int sl_no = Integer.parseInt(request.getParameter("sl_no"));
		String invoice_currency = request.getParameter("invoice_currency");
		String cust_payment_terms = request.getParameter("cust_payment_terms");
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		
        
	        String url="jdbc:mysql://localhost:3306/grey_goose?zeroDateTimeBehavior=convertToNull";
			String uname="root";
			String pass="root";
			Connection conn = DriverManager.getConnection(url, uname, pass);
			String query = "UPDATE winter_internship SET invoice_currency = ?, cust_payment_terms = ? WHERE sl_no = ? ";
			PreparedStatement st = conn.prepareStatement(query);
			st.setString(1, invoice_currency);
			st.setString(2, cust_payment_terms);
			st.setInt(3, sl_no);
			System.out.println(st);
			st.executeUpdate();
			
			
			response.sendRedirect("Fetch");
			st.close();
			conn.close();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

}
