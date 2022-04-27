package com.HighRadius.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

//import com.google.gson.Gson;

/**
 * Servlet implementation class Add
 */
@WebServlet("/Add")
public class Add extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Add() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request,response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			
			//boolean Response;
		
			String business_code = request.getParameter("business_code");
	        int cust_number = request.getParameter("cust_number") != "" ? Integer.parseInt(request.getParameter("cust_number")) : 0;
	        Date clear_date = request.getParameter("clear_date") != "" ? Date.valueOf(request.getParameter("clear_date")):null;
	        int business_year = request.getParameter("business_year") != "" ? Integer.parseInt(request.getParameter("business_year")):0;
	        String doc_id = request.getParameter("doc_id");
	        Date posting_date = request.getParameter("posting_date") != "" ? Date.valueOf(request.getParameter("posting_date")):null;
	        Date document_create_date = request.getParameter("document_create_date") != "" ? Date.valueOf(request.getParameter("document_create_date")):null;
	        Date due_in_date = request.getParameter("due_in_date") != "" ? Date.valueOf(request.getParameter("due_in_date")):null;
	        String invoice_currency = request.getParameter("invoice_currency");
	        String document_type = request.getParameter("document_type");
	        int posting_id = request.getParameter("posting_id") != "" ? Integer.parseInt(request.getParameter("posting_id")):0;
	        String area_business = request.getParameter("area_business");
	        double total_open_amount = request.getParameter("total_open_amount") != "" ? Double.parseDouble(request.getParameter("total_open_amount")):0;
	        Date baseline_create_date = request.getParameter("baseline_create_date") != "" ? Date.valueOf(request.getParameter("baseline_create_date")):null;
	        String cust_payment_terms = request.getParameter("cust_payment_terms");
	        String invoice_id = request.getParameter("invoice_id");
	        System.out.println(business_code);
	        System.out.println(cust_number);
	        System.out.println(clear_date);
	        System.out.println(total_open_amount);
	        System.out.println(business_year);
	        try {
				Class.forName("com.mysql.cj.jdbc.Driver");
		        String url="jdbc:mysql://localhost:3306/grey_goose?zeroDateTimeBehavior=convertToNull";
				String uname="root";
				String pass="root";
				Connection conn = DriverManager.getConnection(url, uname, pass);
				
				String query = "INSERT INTO winter_internship(business_code,cust_number,clear_date,business_year, "
						+ "doc_id, posting_date, document_create_date,due_in_date, invoice_currency, document_type, posting_id, "
						+ "area_business, total_open_amount, baseline_create_date, cust_payment_terms, invoice_id ) "
						+ "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
				PreparedStatement st = conn.prepareStatement(query);
				st.setString(1, business_code);
				st.setInt(2, cust_number);
				st.setDate(3, clear_date);
				st.setInt(4, business_year);
				st.setString(5, doc_id);
				st.setDate(6, posting_date);
				st.setDate(7, document_create_date);
				st.setDate(8, due_in_date);
				st.setString(9, invoice_currency);
				st.setString(10, document_type);
				st.setInt(11, posting_id);
				st.setString(12, area_business);
				st.setDouble(13, total_open_amount);
				st.setDate(14, baseline_create_date);
				st.setString(15, cust_payment_terms);
				st.setString(16, invoice_id);
				
				System.out.println(st);
				st.executeUpdate();
				//Response = (>0) ? true:false;
				
				//Gson gson = new Gson();
				//String jsonResponse = gson.toJson(Response);
				//response.setHeader("Access-Control-Allow-Origin", "*");
				//response.getWriter().append(jsonResponse);
				
				response.sendRedirect("Fetch");
				st.close();
				conn.close();
			
	        } catch (Exception e) {
				e.printStackTrace();
			}
		
		}

}
