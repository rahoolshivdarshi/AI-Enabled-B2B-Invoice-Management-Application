package com.HighRadius.controller;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import com.HighRadius.model.winter_internship;
import com.google.gson.Gson;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/Fetch")
public class Fetch extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public Fetch() {
        super();
        
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		ArrayList<winter_internship> Response = new ArrayList<winter_internship>();
		
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			String url="jdbc:mysql://localhost:3306/grey_goose?zeroDateTimeBehavior=convertToNull";
			String uname="root";
			String pass="root";
			Connection con = DriverManager.getConnection(url, uname, pass);
			
			String query = "Select * from winter_internship";
			PreparedStatement st = con.prepareStatement(query);
			ResultSet rs = st.executeQuery();
			while(rs.next())
			{
				winter_internship wi = new winter_internship();
				wi.setSl_no(rs.getInt("sl_no"));
				wi.setArea_business(rs.getString("area_business"));
				wi.setBaseline_create_date(rs.getDate("baseline_create_date").toString());
				wi.setBusiness_code(rs.getString("business_code"));
				wi.setBusiness_year(rs.getInt("business_year"));
				if(rs.getDate("clear_date") != null)
					wi.setClear_date(rs.getDate("clear_date").toString());
				else
					wi.setClear_date("");
				wi.setCust_number(rs.getInt("cust_number"));
				wi.setCust_payment_terms(rs.getString("cust_payment_terms"));
				wi.setDoc_id(rs.getString("doc_id"));
				wi.setDocument_create_date(rs.getDate("document_create_date").toString());
				wi.setDocument_type(rs.getString("document_type"));
				wi.setDue_in_date(rs.getDate("due_in_date").toString());
				wi.setInvoice_currency(rs.getString("invoice_currency"));
				wi.setInvoice_id(rs.getString("invoice_id"));
				wi.setPosting_id(rs.getInt("posting_id"));
				wi.setPosting_date(rs.getDate("posting_date").toString());
				wi.setTotal_open_amount(rs.getDouble("total_open_amount"));
				wi.setAging_bucket(rs.getString("aging_bucket"));
				Response.add(wi);
			}
			
			Gson gson = new Gson();
			String jsonResponse = gson.toJson(Response);
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.getWriter().append(jsonResponse);
			st.close();
			con.close();
			
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
