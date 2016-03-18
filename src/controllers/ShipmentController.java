package controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import data.ShipmentDAO;
import data.Shipments;

@Controller
public class ShipmentController
{
	@Autowired
	private ShipmentDAO shipDao;
	
	@ResponseBody
	@RequestMapping("ping")
	public String ping()
	{
		return "pong";
	}
	
	// get everything
	@ResponseBody
	@RequestMapping(path="getData")
	public List<Shipments> getAllData()
	{
		System.out.println("in getData");
		List<Shipments> shipments = shipDao.getAllData();
		return shipments;
	}
	
	// search
	@ResponseBody
	@RequestMapping(path="getData/{search}")
	public List<Shipments> search(@PathVariable String search)
	{
		List<Shipments> shipments = shipDao.search(search);
		return shipments;
	}
	
	
	// make new
	@ResponseBody
	@RequestMapping(path = "data", method = RequestMethod.POST)
	public Boolean createData(@RequestBody Shipments shipment)
	{
		System.out.println("in make new");
		return shipDao.createData(shipment);
	}
	
	// update
	@ResponseBody
	@RequestMapping(path = "update/{id}", method = RequestMethod.PUT)
	public Boolean updateData(@PathVariable int id, @RequestBody Shipments shipment)
	{
		System.out.println("in update");
		System.out.println(shipment);
		return shipDao.updateData(id, shipment);
	}
	
	// delete
//	@ResponseBody
//	@RequestMapping(path = "mpg/{id}", method = RequestMethod.DELETE)
//	public Boolean deleteMPG(@PathVariable int id)
//	{
//		return mpgDao.deleteMPG(id);
//	}
}
