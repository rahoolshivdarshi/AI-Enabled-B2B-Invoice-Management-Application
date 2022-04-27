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
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;

import com.google.gson.Gson;


@WebServlet("/Analytics")
public class Analytics extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Analytics() {
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
		
		
		HashMap<String, Object> Response = new HashMap<String, Object>();
		ArrayList<Integer> total_customer = new ArrayList<Integer>();
		ArrayList<Integer> total_amount = new ArrayList<Integer>();
		ArrayList<String> name = new ArrayList<String>();
		ArrayList<String> code= new ArrayList<String>();
		String invoice_currency = request.getParameter("invoice_currency");
		String clear_date_from = request.getParameter("clear_date_from");
		String due_in_date_from = request.getParameter("due_in_date_from");
		String baseline_create_date_from = request.getParameter("baseline_create_date_from") ;
		String clear_date_to = request.getParameter("clear_date_to");
		String due_in_date_to = request.getParameter("due_in_date_to");
		String baseline_create_date_to = request.getParameter("baseline_create_date_to");
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		
        
	        String url="jdbc:mysql://localhost:3306/grey_goose?zeroDateTimeBehavior=convertToNull";
			String uname="root";
			String pass="root";
			Connection conn = DriverManager.getConnection(url, uname, pass);
			
			String query = "SELECT business.business_name, winter_internship.business_code, "
					+ "COUNT(*) AS total_customer, SUM(total_open_amount) AS total_amount "
					+ "FROM business, winter_internship "
					+ "WHERE business.business_code=winter_internship.business_code";
					if(baseline_create_date_from!="" && baseline_create_date_to!="")
						query += " AND baseline_create_date BETWEEN \'" + baseline_create_date_from + "\' AND \'" + baseline_create_date_to + "\'";
					if(clear_date_from!="" && clear_date_to!="")
						query += " AND clear_date BETWEEN \'" + clear_date_from + "\' AND \'" + clear_date_to + "\'";
					if(due_in_date_from!="" && due_in_date_from!="")
						query+= " AND due_in_date BETWEEN \'" + due_in_date_from + "\' AND \'" + due_in_date_to + "\'";
					if(invoice_currency!="")
						query += " AND invoice_currency=\'"+invoice_currency+ "\'";
					query += " GROUP BY business_code ORDER BY business_code;";
			
			PreparedStatement st = conn.prepareStatement(query);
	
			
			System.out.println(st);
			
			ResultSet rs = st.executeQuery();
			while(rs.next())
			{
				code.add(rs.getString("business_code"));
				name.add(rs.getString("business_name"));
				total_customer.add(rs.getInt("total_customer"));
				total_amount.add(rs.getInt("total_amount"));
			}
			
			Response.put("code", code);
			Response.put("name", name);
			Response.put("total_customer", total_customer);
			Response.put("total_amount", total_amount);
			
			Gson gson = new Gson();
			String jsonResponse = gson.toJson(Response);
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.getWriter().append(jsonResponse);
			st.close();
			conn.close();
		
        } catch (Exception e) {
			e.printStackTrace();
		}
	}

}
