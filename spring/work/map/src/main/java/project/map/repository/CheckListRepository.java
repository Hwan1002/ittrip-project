package project.map.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import project.map.entity.CheckListEntity;


@Repository
public interface CheckListRepository extends JpaRepository<CheckListEntity, Integer>{

		//userId와 tripTitle을 기반으로 checklist 가져오기
		@Query("select t.items from CheckListEntity t where t.user.id = ?1 and t.trip.title = ?2")
		String getCheckListByUserIdAndTitle(String id , String title);

		//지우지 마세요>
		
//		//userId와 tripTitle을 기반으로 checklist 수정하기
//		@Transactional
//		@Modifying
//		@Query("update CheckListEntity t SET t.checkList = ?1 where t.user.id = ?2 and t.trip.title = ?3")
//		void updateCheckList(String list, String userId, String title);
}
