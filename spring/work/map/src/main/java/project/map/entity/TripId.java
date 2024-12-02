package project.map.entity;

import java.io.Serializable;
import java.util.Objects;

public class TripId implements Serializable {
    private int idx;
    private String id;

    public TripId() {}

    public TripId(int idx, String id) {
        this.idx = idx;
        this.id = id;
    }

    
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//        TripId tripId = (TripId) o;
//        return idx == tripId.idx && Objects.equals(id, tripId.id);
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(idx, id);
//    }
}
