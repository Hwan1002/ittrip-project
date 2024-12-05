package project.map.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import project.map.entity.TripEntity;

@Repository
public interface TripRepository extends JpaRepository<TripEntity, Integer> {

		//user_Id를 기반으로 trip 정보 가져오기 
		@Query("select t from TripEntity t where t.user.id = ?1 order by t.idx asc")
		<List>TripEntity getTripByUserId(String userId);

		//user_Id를 기반으로 가져온 trip에서 title 변경하기
		@Transactional
		@Modifying
		@Query("update TripEntity t SET t.title = ?1 where t.user.id = ?2")
		void updateTitleByUserId(String title, String userId);
}
