package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

public class Session {
    private int id;
    private int duration;

    private String name;
    private String presenter;
    private String level;

    @JsonProperty(value = "abstract")
    @Field(value = "abstract")
    private String theAbstract;
    private List<String> voters;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPresenter() {
        return presenter;
    }

    public void setPresenter(String presenter) {
        this.presenter = presenter;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getTheAbstract() {
        return theAbstract;
    }

    public void setTheAbstract(String theAbstract) {
        this.theAbstract = theAbstract;
    }

    public List<String> getVoters() {
        return voters;
    }

    public void setVoters(List<String> voters) {
        this.voters = voters;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Session session = (Session) o;
        return id == session.id &&
                duration == session.duration &&
                Objects.equals(name, session.name) &&
                Objects.equals(presenter, session.presenter) &&
                Objects.equals(level, session.level) &&
                Objects.equals(theAbstract, session.theAbstract) &&
                Objects.equals(voters, session.voters);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, duration, name, presenter, level, theAbstract, voters);
    }
}
