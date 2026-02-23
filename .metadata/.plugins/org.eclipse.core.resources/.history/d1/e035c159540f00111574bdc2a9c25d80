package babbynannyapi.model;
import java.util.List;
import java.util.Map;

public class Event {
	
	public Event() {
	}
	
	public Event(Map<String, DayConfig> dates) {
		this.dates = dates;
	}

	private Map<String, DayConfig> dates;

	public static class DayConfig {
		
		public DayConfig() {
		}
		
		public DayConfig(List<Dot> dots) {
			this.dots = dots;
		}
		
		private List<Dot> dots;
		
		public List<Dot> getDots() {
			return dots;
		}

		public void setDots(List<Dot> dots) {
			this.dots = dots;
		}
	}

	public static class Dot {
		public Dot() {
		}
		
		public Dot(String color,String key) {
			this.key = key;
			this.color = color;
		}
		private String key;
		private String color;

		public String getKey() {
			return key;
		}

		public void setKey(String key) {
			this.key = key;
		}

		public String getColor() {
			return color;
		}

		public void setColor(String color) {
			this.color = color;
		}
	}

	public Map<String, DayConfig> getDates() {
		return dates;
	}

	public void setDates(Map<String, DayConfig> dates) {
		this.dates = dates;
	}
}
