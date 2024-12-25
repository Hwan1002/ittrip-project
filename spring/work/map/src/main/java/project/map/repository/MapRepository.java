package project.map.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import project.map.entity.MapEntity;


@Repository
public interface MapRepository extends JpaRepository<MapEntity, Integer>{
	
		//user_Id와 trip_title을 기반으로 위치정보 가져오기
		@Query("select t from MapEntity t where t.user.id = ?1 and t.trip.idx = ?2")
		List<MapEntity> getLocation(String id , Integer tripIdx);

//		@Transactional
//		@Modifying
//		@Query("UPDATE MapEntity t SET " +
//		       "t.startPlace = ?1, " +
//		       "t.startAddress = ?2, " +
//		       "t.startPoint = ?3, " +
//		       "t.goalPlace = ?4, " +
//		       "t.goalAddress = ?5, " +
//		       "t.goalPoint = ?6, " +
//		       "t.days = ?7 " +
//		       "WHERE t.user.id = ?8 and t.trip.title = ?9")
//		void updateMapNoWaypoint(String startPlace,String startAddress,String startPoint,String goalPlace,
//			    String goalAddress,String goalPoint,Integer days,String userId,String tripTitle);
//		
//		@Transactional
//		@Modifying
//		@Query("UPDATE MapEntity t SET " +
//		       "t.startPlace = ?1, " +
//		       "t.startAddress = ?2, " +
//		       "t.startPoint = ?3, " +
//		       "t.goalPlace = ?4, " +
//		       "t.goalAddress = ?5, " +
//		       "t.goalPoint = ?6, " +
//		       "t.waypoint = ?7," +
//		       "t.days = ?8 " +
//		       "WHERE t.user.id = ?9 and t.trip.title = ?10")
//		void updateMap(String startPlace,String startAddress,String startPoint,String goalPlace,
//			    String goalAddress,String goalPoint,String waypoint,Integer days,String userId,String tripTitle);
		    
		
}
