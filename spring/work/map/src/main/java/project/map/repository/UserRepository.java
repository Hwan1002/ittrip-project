package project.map.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import project.map.entity.AreaEntity;
import project.map.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {

		//유저의 address를 받아오기(마이페이지에서 공공데이터 받아올 때 씀)
		@Query("select t.address from USERS t where t.id = ?1")	
		AreaEntity findAddressByUserId(String userId);



}
