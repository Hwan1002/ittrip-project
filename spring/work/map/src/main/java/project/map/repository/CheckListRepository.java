package project.map.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import project.map.entity.CheckListEntity;

@Repository
public interface CheckListRepository extends JpaRepository<CheckListEntity, String>{

}
