package project.map.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import project.map.entity.AreaEntity;

@Repository
public interface AreaRepository extends JpaRepository<AreaEntity, String>{

}
