package project.map.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import project.map.entity.AreaEntity;
import project.map.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {


	//UserEntity findByUserId(String Id); 
	// 아이디 통해 entity 반환
//
	//boolean existsByUserId(String id); 
	// 아이디가 존재하면 true , 존재하지 않으면false 반환 id중복체크?
//
//	UserEntity findByUserIdAndPassword(String id, String password);
//	// userName , password를 통해 두필드를 모두 만족하는 데이터를 찾는 조건의쿼리생성.

		//유저의 address를 받아오기(마이페이지에서 공공데이터 받아올 때 씀)
		@Query("select t.address from USERS t where t.id = ?1")	
		AreaEntity findAddressByUserId(String userId);


}
