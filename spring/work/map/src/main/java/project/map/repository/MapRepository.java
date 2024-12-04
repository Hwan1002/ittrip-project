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
		@Query("select t from MAP t where t.user_id = ?1 and t.trip_title = ?2 orderby days")
		List<MapEntity> getLocationByUserIdAndTitle(String id , String title);

		//days의 값에 따라 위치정보 가져오기
		@Query("select t from MAP t where t.user_id = ?1 and t.trip_title = ?2 and days = ?3")	
		List<MapEntity> getByDays(String id, String title, int days);

		//days,user_Id,trip_title을 기반으로 위치정보 수정하기(경유지가 없는 경우)
		@Transactional
		@Modifying
		@Query("update MapEntity t SET t.start_point = ?1 , t.start_place = ?2, t.goal_point = ?3 , t.goal_place = ?4 where t.user_id = ?5 and t.trip_title = ?")				
		void updateMapNoWayPoints(String s_point , String s_place , String g_point , String g_place , String userId , String title);

		//days,user_Id,trip_title을 기반으로 위치정보 수정하기(경유지가 있는 경우)
		@Transactional
		@Modifying
		@Query("update MapEntity t SET t.startPoint = ?1, t.startPlace = ?2, t.goalPoint = ?3, t.goalPlace = ?4, t.waypointsPoint = ?5, t.waypointsPlace = ?6 WHERE t.user.id = ?7 AND t.trip.title = ?8")
		void updateMap(String s_point , String s_place , String g_point , String g_place, String w_point, String w_place, String userId, String title);
}
