<?php

class Person
{
  private $name;
  private $lastname;
  private $age;
  private $hp;
  private $mother;
  private $father;

  function __construct($name, $lastname, $age, $mother=null, $father=null)
  {
    $this->name = $name;
    $this->lastname = $lastname;
    $this->age = $age;
    $this->mother = $mother;
    $this->father = $father;
  }

  function getName() {
    return $this->name;
  }
  function getLastname() {
    return $this->lastname;
  }
  function getAge() {
    return $this->age;
  }
  function getMother() {
    return $this->mother;
  }
  function getFather() {
    return $this->father;
  }
  function getInfo() {
    return "The name is: " . $this->getName() .
    "<br> The lastname is: " . $this->getLastname() . 
    "<br> The age is: " . $this->getAge() . "";
  }
}

$arnold = new Person("Arnold", "Ivanov", 69, null, null);
$fatima = new Person("Fatima", "Ivanova", 64, null, null);

$igor = new Person("Igor", "Petrov", 68, null, null);
$zina = new Person("Zina", "Petrova", 65, null, null);

$alex = new Person("Alex", "Ivanov", 42, $fatima, $arnold );
$olga = new Person("Olga", "Ivanova", 42, $zina, $igor);
$valera = new Person("Valera", "Ivanov", 15, $olga, $alex);

echo "<h2>A few words about myself:</h2>", $valera->getInfo(),
"<h2>A few words about my mother:</h2>", $valera->getMother()->getInfo(),
"<h2>A few words about my father:</h2>", $valera->getFather()->getInfo(),
"<h2>A few words about my grandmother by mother's family-line:</h2>", $olga->getMother()->getInfo(),
"<h2>A few words about my grandfather by mother's family-line:</h2>", $olga->getFather()->getInfo(),
"<h2>A few words about my grandmother by father's family-line:</h2>", $alex->getMother()->getInfo(),
"<h2>A few words about my grandfather by father's family-line:</h2>", $alex->getFather()->getInfo();
