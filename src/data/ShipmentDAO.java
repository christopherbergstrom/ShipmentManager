package data;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

@Transactional
public class ShipmentDAO
{
	@PersistenceContext
	private EntityManager em;
	
	public List<Shipments> getAllData()
	{
		return em.createQuery("select ship from Shipments ship", Shipments.class).getResultList();
	}
	
	
	public Boolean createData(Shipments shipment)
	{
		em.persist(shipment);
		if (!em.contains(shipment))
		{
			return false;
		} 
		else
		{
			return true;
		}
	}
	
	public List<Shipments> search(String search)
	{
//		return em.find(Shipments.class, id);
		List<Shipments> shipmentsBuyer = em.createQuery("SELECT ship FROM Shipments ship WHERE ship.buyer like :buyer", Shipments.class).setParameter("buyer", "%" + search + "%").getResultList(); 
		List<Shipments> shipmentsItem = em.createQuery("SELECT ship FROM Shipments ship WHERE ship.item like :item", Shipments.class).setParameter("item", "%" + search + "%").getResultList();
		List<Shipments> shipmentsNew = new ArrayList<>();
		HashSet<Shipments> hashsetNew = new HashSet<>();
//		TreeSet<Shipments> hashsetNew = new TreeSet<>();
		
		System.out.println("ShipmentsBuyer: ");
		for (Shipments shipment1 : shipmentsBuyer)
		{
			
			System.out.println(shipment1);
			shipmentsNew.add(shipment1);
		}
		System.out.println("ShipmentsItem: ");
		for (Shipments shipment1 : shipmentsItem)
		{
			System.out.println(shipment1);
			shipmentsNew.add(shipment1);
		}
		
		hashsetNew.addAll(shipmentsNew);
		shipmentsNew.clear();
		shipmentsNew.addAll(hashsetNew);
		
		System.out.println("ShipmentsNew: ");
		for (Shipments shipment1 : shipmentsNew)
		{
			System.out.println(shipment1);
		}
		
		return shipmentsNew;
	}
	public Boolean updateData(int id, Shipments shipment)
	{
		System.out.println("updating");
		System.out.println(shipment);
		shipment.setId(id);
		shipment = em.merge(shipment);
		em.persist(shipment);
		if (!em.contains(shipment))
		{
			return false;
		} 
		else
		{
			return true;
		}
	}
}
