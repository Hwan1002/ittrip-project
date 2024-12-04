package project.map.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import project.map.entity.CheckListEntity;


@Repository
public interface CheckListRepository extends JpaRepository<CheckListEntity, Integer>{

		//user_Id와 trip_title을 기반으로 checklist 가져오기
		@Query("select t from CHECKLIST t where t.user_id = ?1 and t.trip_title = ?2")
		CheckListEntity getCheckListByUserIdAndTitle(String id , String title);

		//user_Id와 trip_title을 기반으로 checklist 수정하기
		@Transactional
		@Modifying
		@Query("update t from CHECKLIST t SET t.checklist = ?1 where t.user_id = ?2 and t.trip_title = ?3")
		void updateCheckList(String list, String userId, String title);
}
