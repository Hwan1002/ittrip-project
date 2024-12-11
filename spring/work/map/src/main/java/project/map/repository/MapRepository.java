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
		@Query("select t from MapEntity t where t.user.id = ?1 and t.trip.title = ?2 order by t.days asc")
		List<MapEntity> getLocationByUserIdAndTitle(String id , String title);

		//days의 값에 따라 위치정보 가져오기
		@Query("select t from MapEntity t where t.user.id = ?1 and t.trip.title = ?2 and days = ?3")	
		List<MapEntity> getByDays(String id, String title, int days);

		
		
		
}
