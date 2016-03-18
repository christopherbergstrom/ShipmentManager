package data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="data")
public class Shipments
{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String buyer;
	private String item;
	private String tracking;
	
	public Shipments()
	{
	}
	
	public Shipments(int id, String buyer, String item, String tracking)
	{
		super();
		this.id = id;
		this.buyer = buyer;
		this.item = item;
		this.tracking = tracking;
	}
	
	public int getId()
	{
		return id;
	}
	public void setId(int id)
	{
		this.id = id;
	}
	public String getBuyer()
	{
		return buyer;
	}
	public void setBuyer(String buyer)
	{
		this.buyer = buyer;
	}
	public String getItem()
	{
		return item;
	}
	public void setItem(String item)
	{
		this.item = item;
	}
	public String getTracking()
	{
		return tracking;
	}
	public void setTracking(String tracking)
	{
		this.tracking = tracking;
	}
	@Override
	public String toString()
	{
		return "Shipments [id=" + id + ", buyer=" + buyer + ", item=" + item + ", tracking=" + tracking + "]";
	}
}
