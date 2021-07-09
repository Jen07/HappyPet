package cr.ac.ucr.happypet.Repository.animals;

import org.springframework.stereotype.Repository;

import cr.ac.ucr.happypet.Model.animals.Specie;

import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

@Repository
public interface SpeciesRepository extends JpaRepositoryImplementation<Specie, String> {}
