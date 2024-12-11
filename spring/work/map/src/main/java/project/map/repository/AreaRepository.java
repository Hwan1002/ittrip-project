package project.map.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import project.map.entity.AreaEntity;

@Repository
public interface AreaRepository extends JpaRepository<AreaEntity, String>{
	
		//메인페이지에 서울특별시 누르면 서울의 시군구 배열에 담음
		@Query("select t.signguNm from AreaEntity t where t.areaNm = ?1")	
		List<AreaEntity> getOneAreaList(String areaNM);
		//전라도,경상도 전용
		@Query("select t.signguNm from AreaEntity t where t.areaNm = ?1 || t.areaNm = ?2")	
		List<AreaEntity> getTwoAreaList(String areaNm1 , String areaNm2);
		//충청도(북도,남도,세종시)
		@Query("select t.signguNm from AreaEntity t where t.areaNm = ?1 || t.areaNm = ?2 || t.areaNm = ?3")	
		List<AreaEntity> getThreeAreaList(String areaNm1 , String areaNm2, String areaNm3);
		
		//지역명(서울특별시), 시군구명(종로구)를 code로 매치시켜 가져오기
		@Query("select t.areaCd , t.signguNm from AreaEntity t where t.areaNm = ?1 and t.signguNm = ?2")
		List<AreaEntity> recommendByAddress(String areaNm, String signguNm);
		
		//충청북도와 남도 등을 구별하기 위한 기능
		String findAreaCdBySignguNm(String signguNm);
}
