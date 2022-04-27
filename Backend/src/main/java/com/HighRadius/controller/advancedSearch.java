package com.HighRadius.controller;


import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;


import com.HighRadius.model.winter_internship;
import com.google.gson.Gson;

/**
 * Servlet implementation class advancedSearch
 */
@WebServlet("/advancedSearch")
public class advancedSearch extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		HashMap<String,String> entries = new HashMap<String, String>();
		ArrayList<winter_internship> Response = new ArrayList<winter_internship>();
		
		String business_year,cust_number, doc_id, invoice_id;
		doc_id = request.getParameter("document_id");
		if(doc_id!="")
			entries.put("doc_id", doc_id);
		
		invoice_id = request.getParameter("invoice_id");
		if(invoice_id!="")
			entries.put("invoice_id", invoice_id);
		
		
		business_year = request.getParameter("business_year");
		if(business_year!="")
			entries.put("business_year", business_year);
		
		cust_number = request.getParameter("customer_number");
		if(cust_number!="")
			entries.put("cust_number", cust_number);
		
		
		System.out.println(doc_id);
		System.out.println(invoice_id);
		System.out.println(business_year);
		System.out.println(cust_number);
		
		
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			String url="jdbc:mysql://localhost:3306/grey_goose?zeroDateTimeBehavior=convertToNull";
			String uname="root";
			String pass="root";
			Connection con = DriverManager.getConnection(url, uname, pass);
			String query = "Select * from winter_internship where ";
			
			int i=0;
			if(entries.size()>=1)
			{
				Iterator<Entry<String, String>> it = entries.entrySet().iterator(); 
				while(it.hasNext())
				
				{   
					Map.Entry<String, String> m = (Map.Entry<String, String>) it.next();
					if(i==0)
					{
						if(m.getKey()=="invoice_id" || m.getKey()=="doc_id")
							query += m.getKey()+"="+ "\"" +m.getValue()+ "\"";
						else
							query += m.getKey()+"=" +m.getValue();
						i++;
					}
					else
					{
						if(m.getKey()=="invoice_id" || m.getKey()=="doc_id")
							query += " AND " +m.getKey()+"="+ "\"" +m.getValue()+ "\"";
						else
							query += " AND " +m.getKey()+"=" +m.getValue();
					}
					it.remove();
					
				}  
			}
			
			System.out.println(query);
			
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(query);
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
				
				Response.add(wi);
				

			}
		
			Gson gson = new Gson();
			String jsonResponse = gson.toJson(Response);
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.getWriter().append(jsonResponse);
			st.close();
			con.close();
		
		} 
		
		catch (Exception e) {
			
			e.printStackTrace();
		}
		
	}

}
