function GeneratedDataset() {
  this.data = [];
}
GeneratedDataset.prototype.addDonor = function(donor) {
  this.data.push(donor);
} 
GeneratedDataset.prototype.toJsonString = function() {
  var dataObj = {};
  for (var i=0; i<this.data.length; i++) {
    var donor = this.getDonorAt(i);
    var donorObj = {};
    if (donor.isAltruistic) {
      donorObj.altruistic = true;
    } else {
      donorObj.sources = donor.sources.map(function(d) {
        return d.id;
      });
    }
    donorObj.dage = donor.dage;
    donorObj.matches = donor.matches.map(function(d) {
      return {recipient: d.recipient.id, score: d.score};
    });
    dataObj[""+donor.id] = donorObj;
  }
  var serializedObj = {data: dataObj};
  return JSON.stringify(serializedObj, undefined, 2);
}
GeneratedDataset.prototype.createXmlNode = function(doc, n, t) {
  var node = doc.createElement(n);
  var textNode = doc.createTextNode(t);
  node.appendChild(textNode);
  return node;
}
GeneratedDataset.prototype.toXmlString = function() {
  var self = this;
  var doc = document.implementation.createDocument(null, null, null);
  var dataNode = doc.createElement("data");
  for (var i=0; i<this.data.length; i++) {
    var donor = this.getDonorAt(i);
    var donorNode = doc.createElement("entry");
    donorNode.setAttribute("donor_id", donor.id);
    if (donor.isAltruistic) {
      donorNode.appendChild(
          this.createXmlNode(doc, "altruistic", "true"));
    }
    donorNode.appendChild(
        this.createXmlNode(doc, "dage", ""+donor.dage));
    if (!donor.isAltruistic) {
      var sourcesNode = doc.createElement("sources");
      donor.sources.forEach(function(d) {
        sourcesNode.appendChild(
            self.createXmlNode(doc, "source", ""+d.id));
      });
      donorNode.appendChild(sourcesNode);
    }
    if (donor.matches.length > 0) {
      var matchesNode = doc.createElement("matches");
      donor.matches.forEach(function(d) {
        var matchNode = doc.createElement("match");
        matchNode.appendChild(
            self.createXmlNode(doc, "recipient", d.recipient.id));
        matchNode.appendChild(
            self.createXmlNode(doc, "score", d.score));
        matchesNode.appendChild(matchNode);
      });
      donorNode.appendChild(matchesNode);
    }
    dataNode.appendChild(donorNode); 
  }
  doc.appendChild(dataNode);
  return (new XMLSerializer()).serializeToString(doc);
}
GeneratedDataset.prototype.getDonorCount = function() {
  return this.data.length;
}
GeneratedDataset.prototype.getDonorAt = function(index) {
  return this.data[index];
}
