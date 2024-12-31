package project.map.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import project.map.dto.AreaDTO;
import project.map.entity.AreaEntity;

@Repository
public interface AreaRepository extends JpaRepository<AreaEntity, String> {

   @Query("select t.signguNm from AreaEntity t where t.areaCd = ?1")
   List<String> findByAreaCd(String areaCd);

   @Query("select t from AreaEntity t where t.areaNm = ?1  and t.signguNm = ?2")
   AreaEntity findByAreaNmSignguNm(String areaNm, String signguNm);

   // 지역명(서울특별시), 시군구명(종로구)를 code로 매치시켜 가져오기
   @Query("select t.areaCd , t.signguNm from AreaEntity t where t.areaNm = ?1 and t.signguNm = ?2")
   List<AreaEntity> recommendByAddress(String areaNm, String signguNm);


}
