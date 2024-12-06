package project.map.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import project.map.entity.AreaEntity;
import project.map.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {



}
