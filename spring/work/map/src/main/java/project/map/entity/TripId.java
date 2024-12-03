//package project.map.entity;
//
//import java.io.Serializable;
//import java.util.Objects;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.Embeddable;
//import lombok.Data;
//
//@Data
//@Embeddable
//public class TripId implements Serializable {
//	@Column(name = "trip_idx")
//    private Integer idx;  // 여행 ID
//	@Column(name = "user_id")
//    private String userId; // 사용자 ID
//
//    public TripId() {}
//
//    public TripId(Integer idx, String userId) {
//        this.idx = idx;
//        this.userId = userId;
//    }
//
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//        TripId tripId = (TripId) o;
//        return Objects.equals(idx, tripId.idx) &&
//               Objects.equals(userId, tripId.userId);
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(idx, userId);
//    }
//}