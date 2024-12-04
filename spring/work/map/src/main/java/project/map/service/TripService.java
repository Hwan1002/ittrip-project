//package project.map.service;
//
//import java.util.Arrays;
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import project.map.entity.MapEntity;
//import project.map.entity.TripEntity;
//import project.map.repository.AreaRepository;
//import project.map.repository.CheckListRepository;
//import project.map.repository.MapRepository;
//import project.map.repository.TripRepository;
//
//@Service
//public class TripService {
//	
//	@Autowired
//	private MapRepository mapRepository;
//	@Autowired
//	private TripRepository tripRepository;
//	@Autowired
//	private CheckListRepository checkListRepository;
//	@Autowired
//	private AreaRepository areaRepository;
//	
//	//경유지 String -> 배열
//	public String[] stringToMap(String wayPoints) {
//		return wayPoints.split("|");
//	}
//	
//	
//}
