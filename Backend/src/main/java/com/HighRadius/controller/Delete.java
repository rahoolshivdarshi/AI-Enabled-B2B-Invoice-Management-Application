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
 * Servlet implementation class Delete
 */
@WebServlet("/Delete")
public class Delete extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Delete() {
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
		
		
		String delIndex,qu = "(";
		int i=0;
		while(true)
		{
			delIndex = request.getParameter(String.valueOf(i));
			if(delIndex==null) 
				break;
			qu = qu+delIndex+",";
			i++;
		}
		qu = qu.substring(0,qu.length()-1) + ")";
		System.out.println(qu);
		
		
		try {
				Class.forName("com.mysql.cj.jdbc.Driver");
			
	        
		        String url="jdbc:mysql://localhost:3306/grey_goose?zeroDateTimeBehavior=convertToNull";
				String uname="root";
				String pass="root";
				Connection conn = DriverManager.getConnection(url, uname, pass);
				String query = "DELETE FROM winter_internship WHERE sl_no IN " + qu;
				PreparedStatement st = conn.prepareStatement(query);
				//st.setString(1, qu);
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
